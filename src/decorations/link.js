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
 * Adds links decorations
 *
 * @method link
 *
 * @param  {Object}   node
 * @param  {Array}    textBlocks
 * @param  {Array}    decorations
 * @param  {Function} reparse
 *
 * @return {void}
 */
module.exports = function link (node, textBlocks, decorations, reparse) {
  if (!node.children.length) {
    return
  }

  /**
   * Below is the list of offsets for all different pieces inside
   * a link
   */
  const endOffset = offset.closingBrace(node.position.end.offset)
  const linkTextStartOffset = node.children[0].position.start.offset
  const linkTextEndOffset = node.children[0].position.end.offset
  const linkUrlStartOffset = offset.linkStart(linkTextEndOffset)
  const linkUrlEndOffset = offset.linkEnd(endOffset, node.title)
  const linkTitleStartOffset = offset.titleStart(linkUrlEndOffset)

  /**
   * Push text to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: linkTextStartOffset,
    end: linkTextEndOffset,
    marks: [{ type: 'linkText' }]
  }))

  /**
   * If the text of the link is not a plain text, then reparse
   * the children.
   *
   * Example:
   * [**Google**](http://google.com)
   *
   * Here `**Google**` is not plain text, but instead a `strong`
   * node.
   */
  if (node.children[0].type !== 'text') {
    reparse(node.children[0], textBlocks, decorations)
  }

  /**
   * Add url to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: linkUrlStartOffset,
    end: linkUrlEndOffset,
    marks: [{ type: 'linkUrl' }]
  }))

  /**
   * If node has a title, then add title to the
   * decorations
   */
  if (node.title) {
    decorations.push(getRange(textBlocks, node, {
      start: linkTitleStartOffset,
      end: endOffset,
      marks: [{ type: 'linkTitle' }]
    }))
  }
}
