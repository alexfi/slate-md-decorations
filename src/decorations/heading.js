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
 * @param  {Object}    node
 * @param  {Array}     textBlocks
 * @param  {Array}     decorations
 * @param  {Function}  reparse
 *
 * @return {void}
 */
module.exports = function emphasis (node, textBlocks, decorations, reparse) {
  decorations.push(getRange(textBlocks, node, {
    start: node.position.start.offset,
    end: node.position.start.offset + node.depth,
    marks: [{ type: 'headingHash' }]
  }))

  decorations.push(getRange(textBlocks, node, {
    start: node.depth + 1,
    end: node.position.end.offset,
    marks: [{ type: 'headingText' }]
  }))

  node.children.forEach((child) => {
    reparse(child, textBlocks, decorations)
  })
}
