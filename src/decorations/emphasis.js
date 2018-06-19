/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const getRange = require('../getRange')

/**
 * Adds emphasis decoration
 *
 * @method emphasis
 *
 * @param  {Object} node
 * @param  {Array}  textBlocks
 * @param  {Array}  decorations
 *
 * @return {void}
 */
module.exports = function emphasis (node, textBlocks, decorations) {
  decorations.push(getRange(textBlocks, node, {
    start: node.position.start.offset,
    end: node.position.end.offset,
    marks: [{ type: 'emphasis' }]
  }))
}
