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
 * @method image
 *
 * @param  {Object}   node
 * @param  {Array}    textBlocks
 * @param  {Array}    decorations
 *
 * @return {void}
 */
module.exports = function image (node, textBlocks, decorations) {
  node.alt = node.alt || ''

  /**
   * Below is the list of offsets for all different pieces inside
   * an image
   */
  const endOffset = offset.closingBrace(node.position.end.offset)
  const imageTextStartOffset = node.position.start.offset + 2
  const imageTextEndOffset = imageTextStartOffset + node.alt.length
  const imageUrlStartOffset = offset.linkStart(imageTextEndOffset)
  const imageUrlEndOffset = offset.linkEnd(endOffset, node.title)
  const imageTitleStartOffset = offset.titleStart(imageUrlEndOffset)

  /**
   * Push text to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: imageTextStartOffset,
    end: imageTextEndOffset,
    marks: [{ type: 'imageAlt' }]
  }))

  /**
   * Add url to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: imageUrlStartOffset,
    end: imageUrlEndOffset,
    marks: [{ type: 'imageUrl' }]
  }))

  /**
   * If node has a title, then add title to the
   * decorations
   */
  if (node.title) {
    decorations.push(getRange(textBlocks, node, {
      start: imageTitleStartOffset,
      end: endOffset,
      marks: [{ type: 'imageTitle' }]
    }))
  }
}
