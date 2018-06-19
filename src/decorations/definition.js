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
   * We add 3 to the end offset of identifier. This includes
   * - `[` the starting bracket
   * - `]` the closing bracket
   * - `:` The colon
   */
  const identifierOffset = node.identifier.length + 3

  /**
   * If there is a title in the definition url, then we need to
   * subtract the length of title and another 3 for.
   *
   * - `"` opening quote
   * - `"` closing quote
   * - `]` closing bracket after the title
   *
   * Example:
   * [1]: google.com "Google"
   */
  let definitionUrlOffset = node.position.end.offset
  if (node.title) {
    definitionUrlOffset = definitionUrlOffset - node.title.length - 3
  }

  /**
   * Push the definition text to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: node.position.start.offset,
    end: identifierOffset,
    marks: [{ type: 'definitionText' }]
  }))

  /**
   * Push the definition url to the decorations
   */
  decorations.push(getRange(textBlocks, node, {
    start: identifierOffset + 1,
    end: definitionUrlOffset,
    marks: [{ type: 'definitionUrl' }]
  }))

  /**
   * If there is a title, then we also need to push the
   * title decoration
   */
  if (node.title) {
    decorations.push(getRange(textBlocks, node, {
      start: definitionUrlOffset + 1,
      end: node.position.end.offset,
      marks: [{ type: 'definitionTitle' }]
    }))
  }
}
