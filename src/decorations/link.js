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
  /**
   * The text for the link is present as a children on the node.
   * We add `1` to the end offset, which is for the closing `]`
   * bracket.
   */
  const linkTextOffset = node.children[0].position.end.offset + 1

  /**
   * If link has a title, we need to subtract the length of title
   * from the offset to get the correct offset of just the URL.
   *
   * Also we remove another 4 characters from the offset for.
   *
   * - ` ` Blank space between URL and the title.
   * - `"` Opening quote
   * - `"` Closing quote
   * - `]` Closing bracket.
   */
  let linkUrlOffset = node.position.end.offset
  if (node.title) {
    linkUrlOffset = linkUrlOffset - node.title.length - 4
  }

  /**
   * Push text to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: node.position.start.offset,
    end: linkTextOffset,
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
    start: linkTextOffset + 1,
    end: linkUrlOffset,
    marks: [{ type: 'linkUrl' }]
  }))

  /**
   * If node has a title, then add title to the
   * decorations
   */
  if (node.title) {
    decorations.push(getRange(textBlocks, node, {
      start: linkUrlOffset + 1,
      end: node.position.end.offset,
      marks: [{ type: 'linkTitle' }]
    }))
  }
}
