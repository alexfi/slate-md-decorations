/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const getRange = require('../getRange')
const offset = require('../offset')

/**
 * Adds linkReference decorations
 *
 * @method linkReference
 *
 * @param  {Object}   node
 * @param  {Array}    textBlocks
 * @param  {Array}    decorations
 * @param  {Function} reparse
 *
 * @return {void}
 */
module.exports = function linkReference (node, textBlocks, decorations, reparse) {
  if (!node.children.length) {
    return
  }

  /**
   * Below is the list of offsets for all different pieces inside
   * a link reference
   */
  const linkTextStartOffset = node.children[0].position.start.offset
  const linkTextEndOffset = node.children[0].position.end.offset
  const linkUrlStartOffset = offset.linkStart(linkTextEndOffset)
  const linkUrlEndOffset = offset.closingBrace(node.position.end.offset)

  /**
   * Push text to the node
  */
  decorations.push(getRange(textBlocks, node, {
    start: linkTextStartOffset,
    end: linkTextEndOffset,
    marks: [{ type: 'linkReferenceText' }]
  }))

  /**
   * If the text of the link is not a plain text, then reparse
   * the children.
   *
   * Example:
   * [**Google**][google]
   *
   * Here `**Google**` is not plain text, but instead a `strong`
   * node.
   */
  if (node.children[0].type !== 'text') {
    reparse(node.children[0], textBlocks, decorations)
  }

  /**
   * Add referenceUrl decoration
   */
  decorations.push(getRange(textBlocks, node, {
    start: linkUrlStartOffset,
    end: linkUrlEndOffset,
    marks: [{ type: 'linkReferenceUrl' }]
  }))
}
