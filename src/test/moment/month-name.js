import { module, test } from '../qunit';
import moment from '../../moment';

module('month name');

test('month January is returned', function (assert) {
    var dateJan = moment('29-01-1995', ['DD-MM-YYYY'])
    var dateJan2 = moment('1995-01-23', ['YYYY-MM-DD'])

    assert.equal(dateJan.getMonthName(), 'January')
    assert.equal(dateJan2.getMonthName(), 'January')
});

test('month February is returned', function (assert) {
  var dateFeb = moment('21-02-1995', ['DD-MM-YYYY'])
  var dateFeb2 = moment('1995-02-23', ['YYYY-MM-DD'])

  assert.equal(dateFeb.getMonthName(), 'February')
  assert.equal(dateFeb2.getMonthName(), 'February')
});

test('month March is returned', function (assert) {
  var dateMar = moment('21-03-1995', ['DD-MM-YYYY'])
  var dateMar2 = moment('1995-03-23', ['YYYY-MM-DD'])

  assert.equal(dateMar.getMonthName(), 'March')
  assert.equal(dateMar2.getMonthName(), 'March')
});

test('month April is returned', function (assert) {
  var dateApr = moment('21-04-1995', ['DD-MM-YYYY'])
  var dateApr2 = moment('1995-04-23', ['YYYY-MM-DD'])

  assert.equal(dateApr.getMonthName(), 'April')
  assert.equal(dateApr2.getMonthName(), 'April')
});

test('month May is returned', function (assert) {
  var dateMay = moment('21-05-1995', ['DD-MM-YYYY'])
  var dateMay2 = moment('1995-05-23', ['YYYY-MM-DD'])

  assert.equal(dateMay.getMonthName(), 'May')
  assert.equal(dateMay2.getMonthName(), 'May')
});

test('month June is returned', function (assert) {
  var dateJun = moment('21-06-1995', ['DD-MM-YYYY'])
  var dateJun2 = moment('1995-06-23', ['YYYY-MM-DD'])

  assert.equal(dateJun.getMonthName(), 'June')
  assert.equal(dateJun2.getMonthName(), 'June')
});

test('month July is returned', function (assert) {
  var dateJul = moment('21-07-1995', ['DD-MM-YYYY'])
  var dateJul2 = moment('1995-07-23', ['YYYY-MM-DD'])

  assert.equal(dateJul.getMonthName(), 'July')
  assert.equal(dateJul2.getMonthName(), 'July')
});

test('month August is returned', function (assert) {
  var dateAug = moment('21-08-1995', ['DD-MM-YYYY'])
  var dateAug2 = moment('1995-08-23', ['YYYY-MM-DD'])

  assert.equal(dateAug.getMonthName(), 'August')
  assert.equal(dateAug2.getMonthName(), 'August')
});

test('month September is returned', function (assert) {
  var dateSep = moment('21-09-1995', ['DD-MM-YYYY'])
  var dateSep2 = moment('1995-09-23', ['YYYY-MM-DD'])

  assert.equal(dateSep.getMonthName(), 'September')
  assert.equal(dateSep2.getMonthName(), 'September')
});

test('month October is returned', function (assert) {
  var dateOct = moment('21-10-1995', ['DD-MM-YYYY'])
  var dateOct2 = moment('1995-10-23', ['YYYY-MM-DD'])

  assert.equal(dateOct.getMonthName(), 'October')
  assert.equal(dateOct2.getMonthName(), 'October')
});

test('month November is returned', function (assert) {
  var dateNov = moment('21-11-1995', ['DD-MM-YYYY'])
  var dateNov2 = moment('1995-11-23', ['YYYY-MM-DD'])

  assert.equal(dateNov.getMonthName(), 'November')
  assert.equal(dateNov2.getMonthName(), 'November')
});

test('month December is returned', function (assert) {
  var dateDec = moment('21-12-1995', ['DD-MM-YYYY'])
  var dateDec2 = moment('1995-12-23', ['YYYY-MM-DD'])

  assert.equal(dateDec.getMonthName(), 'December')
  assert.equal(dateDec2.getMonthName(), 'December')
});

test('if value out of range, undefined is returned', function (assert) {
  var dateFeb = moment('21-13-1995', ['DD-MM-YYYY'])

  assert.equal(dateFeb.getMonthName(), undefined)
});
