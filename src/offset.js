/*
* slate-md-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

module.exports = {
  openingBrace (offset) {
    return offset + 1
  },

  closingBrace (offset) {
    return offset - 1
  },

  linkStart (offset) {
    return offset + 2
  },

  definitionLinkStart (offset) {
    return offset + 2
  },

  definitionLinkEnd (offset, title) {
    return title ? offset - title.length - 3 : offset
  },

  linkEnd (offset, title) {
    return title ? offset - title.length - 3 : offset
  },

  titleStart (offset) {
    return offset + 1
  },

  identifier (offset) {
    return offset + 1
  }
}
