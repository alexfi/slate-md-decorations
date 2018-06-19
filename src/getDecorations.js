/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const decorationsList = require('./decorations')

/**
 * Process a single node at a time and mutates the decorations
 * array
 *
 * @method processNode
 *
 * @param  {Object}    node
 * @param  {Array}    textBlocks
 * @param  {Array}    decorations
 *
 * @return {void}
 */
function processNode (node, textBlocks, decorations) {
  /**
   * Ignore node, when there is not decoration available
   * for the type
   */
  if (!decorationsList[node.type]) {
    return
  }

  /**
   * Otherwise process it
   */
  decorationsList[node.type](node, textBlocks, decorations, processNode)
}

/**
 * Returns an array of decorations for remark ast
 *
 * @method exports
 *
 * @param  {Object} ast
 * @param  {Array}  textBlocks
 *
 * @return {Array}
 */
module.exports = function getDecorations (ast, textBlocks) {
  const decorations = []

  /**
   * Parses all childs inside the parent node
   */
  ast.children.forEach((node) => (processNode(node, textBlocks, decorations)))

  return decorations
}
