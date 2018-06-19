/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const remark = require('remark')

/**
 * Converts markdown text to ast
 *
 * @method exports
 *
 * @param  {String} md
 *
 * @return {Objecr}
 */
module.exports = function (md) {
  return remark()
    .use(function () {
      this.Compiler = function (node) {
        return node
      }
    })
    .processSync(md)
}
