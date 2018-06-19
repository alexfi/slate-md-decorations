/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

module.exports = function (textBlocks, { position }, { start, end, marks }) {
  return {
    anchorKey: textBlocks[position.start.line - 1].key,
    anchorOffset: start,
    focusKey: textBlocks[position.end.line - 1].key,
    focusOffset: end,
    marks
  }
}
