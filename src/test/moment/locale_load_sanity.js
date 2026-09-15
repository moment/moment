import { module, test } from '../qunit';
import moment from '../../moment';
import each from '../helpers/each';

// @see https://github.com/moment/moment/security/advisories/GHSA-4p3w-j4w9-5jqw

module('locale load sanity');

function attackPath(id) {
    // Unique suffix so the internal locales[key] cache does not short-circuit
    // later vectors after an earlier lookup is recorded.
    return '../../../../../../etc/passwd-' + id;
}

function craftedVectors() {
    return [
        {
            label: 'plain traversal string (baseline)',
            build: function () {
                return '../../not-a-real-locale';
            },
        },
        {
            label: 'plain object with match() and toString()',
            build: function (path) {
                return {
                    match: function () {
                        return ['x'];
                    },
                    toString: function () {
                        return path;
                    },
                };
            },
        },
        {
            label: 'Proxy synthesizing match/toString',
            build: function (path) {
                return new Proxy(
                    {},
                    {
                        get: function (target, key) {
                            if (key === 'match') {
                                return function () {
                                    return ['x'];
                                };
                            }
                            if (
                                key === 'toString' ||
                                key === Symbol.toPrimitive
                            ) {
                                return function () {
                                    return path;
                                };
                            }
                            return undefined;
                        },
                    }
                );
            },
        },
        {
            label: 'Symbol.toPrimitive overriding coercion',
            build: function (path) {
                var obj = {
                    match: function () {
                        return ['x'];
                    },
                };
                obj[Symbol.toPrimitive] = function () {
                    return path;
                };
                return obj;
            },
        },
        {
            label: 'callable function carrying match/toString',
            build: function (path) {
                var fn = function () {};
                fn.match = function () {
                    return ['x'];
                };
                fn.toString = function () {
                    return path;
                };
                return fn;
            },
        },
        {
            label: 'class instance with match/toString on prototype',
            build: function (path) {
                function Locale() {}
                Locale.prototype.match = function () {
                    return ['x'];
                };
                Locale.prototype.toString = function () {
                    return path;
                };
                return new Locale();
            },
        },
        {
            label: 'getter-defined match property',
            build: function (path) {
                var obj = {
                    toString: function () {
                        return path;
                    },
                };
                Object.defineProperty(obj, 'match', {
                    get: function () {
                        return function () {
                            return ['x'];
                        };
                    },
                });
                return obj;
            },
        },
        {
            label: 'inherited match/toString via Object.create',
            build: function (path) {
                return Object.create({
                    match: function () {
                        return ['x'];
                    },
                    toString: function () {
                        return path;
                    },
                });
            },
        },
        {
            label: 'null-prototype object with own match/toString',
            build: function (path) {
                var obj = Object.create(null);
                obj.match = function () {
                    return ['x'];
                };
                obj.toString = function () {
                    return path;
                };
                return obj;
            },
        },
    ];
}

test('loadLocale rejects non-string names that fake the guard', function (assert) {
    var NodeModule;

    try {
        NodeModule = require('module');
    } catch (e) {
        assert.ok(true, 'skipped: not running under Node');
        return;
    }

    each(craftedVectors(), function (vector, index) {
        var input = vector.build(attackPath('v' + index)),
            originalResolve = NodeModule._resolveFilename,
            observed = null;

        // Report every requested module as missing so nothing is loaded from
        // disk; only the observed request path matters.
        NodeModule._resolveFilename = function (request) {
            observed = request;
            var err = new Error("Cannot find module '" + request + "'");
            err.code = 'MODULE_NOT_FOUND';
            throw err;
        };

        try {
            moment.locale(input);
        } catch (e) {
            // Exotic inputs may throw during downstream stringification; the
            // observed resolver request is what this test asserts on.
        } finally {
            NodeModule._resolveFilename = originalResolve;
        }

        assert.ok(
            observed === null ||
                (observed.indexOf('..') === -1 &&
                    observed.indexOf('/etc/') === -1),
            vector.label +
                ' must not reach require() with an attacker path, saw: ' +
                observed
        );
    });
});
