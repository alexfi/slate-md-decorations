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
 * Adds definition decorations
 *
 * @method definition
 *
 * @param  {Object} node
 * @param  {Array}  textBlocks
 * @param  {Array}  decorations
 *
 * @return {void}
 */
module.exports = function definition (node, textBlocks, decorations) {
  /**
   * Offsets for all pieces inside definition
   */
  const identifierStartOffset = offset.openingBrace(node.position.start.offset)
  const identifierEndOffset = offset.identifier(node.identifier.length)
  const endOffset = node.position.end.offset
  const linkUrlStartOffset = offset.definitionLinkStart(identifierEndOffset)
  const linkUrlEndOffset = offset.definitionLinkEnd(endOffset, node.title)
  const linkTitleStartOffset = offset.titleStart(linkUrlEndOffset)

  /**
   * Push the definition text to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: identifierStartOffset,
    end: identifierEndOffset,
    marks: [{ type: 'definitionText' }]
  }))

  /**
   * Push the definition url to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: linkUrlStartOffset,
    end: linkUrlEndOffset,
    marks: [{ type: 'definitionUrl' }]
  }))

  /**
   * If there is a title, then we also need to push the
   * title decoration
   */
  if (node.title) {
    decorations.push(getRange(textBlocks, node, {
      start: linkTitleStartOffset,
      end: endOffset,
      marks: [{ type: 'definitionTitle' }]
    }))
  }
}
