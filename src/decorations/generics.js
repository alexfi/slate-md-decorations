/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Loops over it's children and reparses them
 *
 * @method paragraph
 *
 * @param  {Object}   node
 * @param  {Array}    textBlocks
 * @param  {Array}    decorations
 * @param  {Function} reparse
 *
 * @return {void}
 */
module.exports = function paragraph (node, textBlocks, decorations, reparse) {
  node.children.forEach((innerNode) => (reparse(innerNode, textBlocks, decorations)))
}
