/*global QUnit:false*/

import moment from "../moment";

export var test = QUnit.test;

export function module (name, lifecycle) {
    QUnit.module(name, {
        setup : function () {
            moment.locale('en');
            moment.createFromInputFallback = function () {
                throw new Error('input not handled by moment');
            };
            if (lifecycle && lifecycle.setup) {
                lifecycle.setup();
            }
        },
        teardown : function () {
            if (lifecycle && lifecycle.teardown) {
                lifecycle.teardown();
            }
        }
    });
}
