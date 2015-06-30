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

/**
 * Provides a helper object which provides some data/eval manipulation.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @class Data
 */

/**
 * Helper function to convert a property name to an XPath used through eval to
 * get or set a config value.
 *
 * @method nameToXPath
 * @param {String} name The name of the property.
 * @param {String} [sep='.'] The seperator being used.
 * @return {String} The name converted to an eval xpath.
 */
function nameToXPath(name, sep) {
  'use strict';

  if (!sep) {
    sep = '.';
  }

  return name.split(sep).join('"]["');
}

/**
 * Get the data manipulation object.
 *
 * @param {Object} data The data object to manipulate.
 * @param {String} [sep='.'] The name seperator.
 * @return {Object} An object containing the get, set, has and del methods.
 */
module.exports = function (data, sep) {
  'use strict';

  if (!sep) {
    sep = '.';
  }

  var me = {
    /**
     * Determines if the provided property exists.
     *
     * @method has
     * @param {String} name The name of the property to check.
     * @return {Boolean} Returns true or false.
     */
    has: function (name) {
      var has = false;

      /* jshint -W061 */
      /* eslint-disable */
      eval('try {\
        has = data["' + nameToXPath(name, sep) + '"] !== undefined;\
      } catch (err) {\
        has = false;\
      }');
      /* eslint-enable */

      return has;
    },

    /**
     * Get the value of the property, or the default value.
     *
     * @method get
     * @param {String} name The name of the property to get.
     * @param {Mixed} [def=null] The default value to return if the property
     *   doesnt exist.
     * @return {Mixed} Returns the property value, otherwise the def value.
     */
    get: function dataGet(name, def) {
      if (def === undefined) {
        def = null;
      }

      var n = nameToXPath(name, sep),
          val;

      /* jshint -W061 */
      /* eslint-disable */
      eval('try {\
        val = data["' + n + '"] !== undefined ? data["' + n + '"] : def;\
      } catch (err) {\
        val = def;\
      }');
      /* eslint-enable */

      return val;
    },

    /**
     * Set the value of a property.
     *
     * @method set
     * @param {String} name The name of the property to set.
     * @param {Mixed} value The value to assign.
     * @returns {Object} Returns self.
     * @chainable
     */
    set: function (name, value) {
      var ns = name.split(sep),
          xpath = '';

      for (var i = 0, len = ns.length - 1; i < len; i++) {
        xpath += (i > 0 ? '"]["' : '') + ns[i];

        /* jshint -W061 */
        /* eslint-disable */
        eval('if (data["' + xpath + '"] === undefined) {\
          data["' + xpath + '"] = {};\
        }');
        /* eslint-enable */
      }

      /* jshint -W061 */
      /* eslint-disable */
      eval('data["' + nameToXPath(name, sep) + '"] = value;');
      /* eslint-enable */

      return me;
    },

    /**
     * Deletes the value of a property.
     *
     * @method del
     * @param {String} name The name of the property to delete.
     * @returns {Object} Returns self.
     * @chainable
     */
    del: function (name) {
      /* jshint -W061 */
      /* eslint-disable */
      eval('delete data["' + nameToXPath(name, sep) + '"];');
      /* eslint-enable */

      return me;
    }
  };

  return me;
};
