/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const md2ast = require('./src/md2ast')
const getDecorations = require('./src/getDecorations')

/**
 * Returns decorations for a given node by parsing
 * the text as markdown.
 *
 * @method exports
 *
 * @param  {Node} node
 *
 * @return {Array<Range>}
 */
module.exports = function decorations (node, ignoreNode) {
  ignoreNode = typeof (ignoreNode) === 'function' ? ignoreNode : function () { return true }

  if (node.object !== 'block' || !ignoreNode(node)) {
    return []
  }

  return getDecorations(
    md2ast(node.text).contents,
    node.getTexts().toArray()
  )
}
