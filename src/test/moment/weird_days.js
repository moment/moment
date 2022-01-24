import { module, test } from '../qunit';
import moment from '../../moment';

module('weird days');

test('weird days', function (assert) {
    /**
     * In 2022, January 1/2/3 falls into the "weird" category where
     * the week of the date depends on the locale more than usually.
     * Moment internally uses ISO-8601 dates/weeks, etc., but does
     * default to using EN_US locale for locale-dependent methods
     * unless otherwise explicitly instructed to...
     *
     * By ISO-8601 definitions,
     * - first day of week is monday
     * - first week of year is where the first Thursday of January
     *   lands on (i.e. "the week with most days of starting year".
     *
     * By EN_US -locale definitions,
     * - first day of week is sunday
     * - first week of year is where January 1st lands on
     *
     * The "problem" with JAN 1-3 is that the week numbers don't
     * align properly with EN_US -locale in regards to ISO-8601
     * definitions.
     *
     * December 31st, 2021 lands on
     * - Week 52 based on ISO-8601
     * - Week 1 based on EN_US -locale
     *
     * January 1st, 2022 lands on
     * - Week 52 based on ISO-8601
     * - Week 1 based on EN_US -locale
     *
     * January 2nd, 2022 lands on
     * - Week 52 based on ISO-8601
     * - Week 2 based on EN_US -locale
     *
     * January 3rd, 2022 lands on
     * - Week 1 based on ISO-8601
     * - Week 2 based on EN_US -locale
     */
    assert.equal(moment('2021-12-31').format('GGGG-WW'), '2021-52');
    assert.equal(moment('2021-12-31').format('WW'), '52');
    assert.equal(moment('2021-12-31').format('YYYY-ww'), '2021-01');
    assert.equal(moment('2021-12-31').format('gggg-WW'), '2022-52');
    assert.equal(moment('2021-12-31').format('gggg-ww'), '2022-01');
    assert.equal(moment('2021-12-31').format('ww'), '01');
    assert.equal(moment('2021-12-31').isoWeek(), 52);
    assert.equal(moment('2021-12-31').week(), 1);
    assert.equal(moment('2022-01-01').format('GGGG-WW'), '2021-52');
    assert.equal(moment('2022-01-01').format('GGGG-ww'), '2021-01');
    assert.equal(moment('2022-01-01').format('WW'), '52');
    assert.equal(moment('2022-01-01').format('YYYY-ww'), '2022-01');
    assert.equal(moment('2022-01-01').format('gggg-WW'), '2022-52');
    assert.equal(moment('2022-01-01').format('gggg-ww'), '2022-01');
    assert.equal(moment('2022-01-01').format('ww'), '01');
    assert.equal(moment('2022-01-01').isoWeek(), 52);
    assert.equal(moment('2022-01-01').week(), 1);
    assert.equal(moment('2022-01-02').format('WW'), '52');
    assert.equal(moment('2022-01-02').format('YYYY-ww'), '2022-02');
    assert.equal(moment('2022-01-02').format('ww'), '02');
    assert.equal(moment('2022-01-02').isoWeek(), 52);
    assert.equal(moment('2022-01-02').isoWeek(), 52);
    assert.equal(moment('2022-01-02').week(), 2);
    assert.equal(moment('2022-01-02').week(), 2);
    assert.equal(moment('2022-01-03').format('WW'), '01');
    assert.equal(moment('2022-01-03').format('YYYY-WW'), '2022-01');
    assert.equal(moment('2022-01-03').format('YYYY-ww'), '2022-02');
    assert.equal(moment('2022-01-03').format('ww'), '02');
    assert.equal(moment('2022-01-03').isoWeek(), 1);
    assert.equal(moment('2022-01-03').week(), 2);
  }
);
