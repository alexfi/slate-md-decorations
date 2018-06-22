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
    anchorKey: textBlocks[0].key,
    anchorOffset: start,
    focusKey: textBlocks[0].key,
    focusOffset: end,
    marks
  }
}
