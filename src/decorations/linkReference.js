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
  /**
   * The text for the link is present as a children on the node.
   * We add `1` to the end offset, which is for the closing `]`
   * bracket.
   */
  const linkTextOffset = node.children[0].position.end.offset + 1

  /**
   * Push text to the node
  */
  decorations.push(getRange(textBlocks, node, {
    start: node.position.start.offset,
    end: linkTextOffset,
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
    start: linkTextOffset + 1,
    end: node.position.end.offset,
    marks: [{ type: 'linkReferenceUrl' }]
  }))
}
