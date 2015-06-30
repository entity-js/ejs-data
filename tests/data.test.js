/**
 *  ______   __   __   ______  __   ______  __  __
 * /\  ___\ /\ "-.\ \ /\__  _\/\ \ /\__  _\/\ \_\ \
 * \ \  __\ \ \ \-.  \\/_/\ \/\ \ \\/_/\ \/\ \____ \
 *  \ \_____\\ \_\\"\_\  \ \_\ \ \_\  \ \_\ \/\_____\
 *   \/_____/ \/_/ \/_/   \/_/  \/_/   \/_/  \/_____/
 *                                         __   ______
 *                                        /\ \ /\  ___\
 *                                       _\_\ \\ \___  \
 *                                      /\_____\\/\_____\
 *                                      \/_____/ \/_____/
 */

var test = require('unit.js');

describe('ejs/data', function () {

  'use strict';

  var data = require('../lib');

  describe('Data.has()', function () {

    it('hasShouldReturnFalseIfPropertyDoesntExist', function () {

      var config = {};

      test.bool(
        data(config).has('test')
      ).isNotTrue();

    });

    it('hasShouldFindTheFirstLevelPropertyOfSingleLevel', function () {

      var config = {'test': 'hello'};

      test.bool(
        data(config).has('test')
      ).isTrue();

    });

    it('hasShouldFindTheFirstLevelPropertyOfMultiLevel', function () {

      var config = {'test': {'value': 'hello'}};

      test.bool(
        data(config).has('test')
      ).isTrue();

    });

    it('hasShouldFindTheSecondLevelPropertyOfMultiLevel', function () {

      var config = {'test': {'value': 'hello'}};

      test.bool(
        data(config).has('test.value')
      ).isTrue();

    });

    it('hasShouldntFindDeepProperty', function () {

      var config = {};

      test.bool(
        data(config).has('test.hello.world.foo')
      ).isNotTrue();

    });

    it('hasShouldFindDeepProperty', function () {

      var config = {test: {hello: {world: {foo: 'bar'}}}};

      test.bool(
        data(config).has('test.hello.world.foo')
      ).isTrue();

    });

  });

  describe('Data.get()', function () {

    it('getWillReturnNullIfItDoesntExist', function () {

      var config = {};

      test.value(
        data(config).get('test')
      ).isNull();

    });

    it('getWillReturnTheDefaultValueIfItDoesntExist', function () {

      var config = {};

      test.bool(
        data(config).get('test', true)
      ).isTrue();

    });

    it('getTheFirstLevelPropertyOfSingleLevel', function () {

      var config = {'test': 'value'};

      test.string(
        data(config).get('test')
      ).is('value');

    });

    it('getTheFirstLevelPropertyOfMultiLevel', function () {

      var config = {'test': {'value': 'hello'}};

      test.object(
        data(config).get('test')
      ).is({'value': 'hello'});

    });

    it('getTheSecondLevelPropertyOfMultiLevel', function () {

      var config = {'test': {'value': 'hello'}};

      test.string(
        data(config).get('test.value')
      ).is('hello');

    });

    it('getUnknownDeepLevelValue', function () {

      var config = {};

      test.value(
        data(config).get('test.hello.world.foo')
      ).isNull();

    });

    it('getUnknownDeepLevelValue', function () {

      var config = {test: {hello: {world: {foo: 'bar'}}}};

      test.string(
        data(config).get('test.hello.world.foo')
      ).is('bar');

    });

  });

  describe('Data.set()', function () {

    it('setValue', function () {

      var config = {};

      data(config).set('test', 'hello');
      test.object(
        config
      ).is({
        'test': 'hello'
      });

    });

    it('setValueChaining', function () {

      var config = {};

      data(config)
        .set('test', 'hello')
        .set('test2', 'world');

      test.object(
        config
      ).is({
        'test': 'hello',
        'test2': 'world'
      });

    });

    it('setMultiLevelValue', function () {

      var config = {};

      data(config).set('test.value', 'hello');
      test.object(
        config
      ).is({
        'test': {
          'value': 'hello'
        }
      });

    });

    it('setDeepLevelLevelValue', function () {

      var config = {};

      data(config).set('test.hello.world.foo', 'bar');
      test.object(
        config
      ).is({
        'test': {
          'hello': {
            'world': {
              'foo': 'bar'
            }
          }
        }
      });

    });

  });

  describe('Data.del()', function () {

    it('delValue', function () {

      var config = {'test': 'hello'};

      data(config).del('test');
      test.object(
        config
      ).is({});

    });

    it('delValueChaining', function () {

      var config = {'test': 'hello', 'test2': 'world'};

      data(config)
        .del('test')
        .del('test2');

      test.object(
        config
      ).is({});

    });

    it('delMultiValue', function () {

      var config = {'test': {'value': 'hello'}};

      data(config).del('test');
      test.object(
        config
      ).is({});

    });

    it('delMultiValueValue', function () {

      var config = {'test': {'value': 'hello'}};

      data(config).del('test.value');
      test.object(
        config
      ).is({
        'test': {}
      });

    });

  });

});
