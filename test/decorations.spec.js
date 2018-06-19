/*
* slate-decorations
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const test = require('japa')
const { Block } = require('slate')
const getDecorations = require('..')

function getNode (text) {
  return Block.fromJSON({
    object: 'block',
    type: 'paragraph',
    nodes: [
      {
        object: 'text',
        leaves: [{ text }]
      }
    ]
  })
}

test('return decorations for strong', (assert) => {
  const template = 'Hello **world**'
  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 6,
      focusKey: textLeaf.key,
      focusOffset: 15,
      marks: [{ type: 'strong' }]
    }
  ])
})

test('return decorations for emphasis', (assert) => {
  const template = 'Hello *world*'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 6,
      focusKey: textLeaf.key,
      focusOffset: 13,
      marks: [{ type: 'emphasis' }]
    }
  ])
})

test('return decorations for inline code', (assert) => {
  const template = 'Hello `world`'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 6,
      focusKey: textLeaf.key,
      focusOffset: 13,
      marks: [{ type: 'inlineCode' }]
    }
  ])
})

test('return decorations for strike through', (assert) => {
  const template = 'Hello ~~world~~'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 6,
      focusKey: textLeaf.key,
      focusOffset: 15,
      marks: [{ type: 'strike' }]
    }
  ])
})

test('return decorations for link', (assert) => {
  const template = 'Visit [Google](https://google.com)'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 6,
      focusKey: textLeaf.key,
      focusOffset: 14,
      marks: [{ type: 'linkText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 15,
      focusKey: textLeaf.key,
      focusOffset: 34,
      marks: [{ type: 'linkUrl' }]
    }
  ])
})

test('return decorations for link with title', (assert) => {
  const template = 'Visit [Google](https://google.com "Google")'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 6,
      focusKey: textLeaf.key,
      focusOffset: 14,
      marks: [{ type: 'linkText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 15,
      focusKey: textLeaf.key,
      focusOffset: 33,
      marks: [{ type: 'linkUrl' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 34,
      focusKey: textLeaf.key,
      focusOffset: 43,
      marks: [{ type: 'linkTitle' }]
    }
  ])
})

test('return decorations for definition', (assert) => {
  const template = '[1]: google.com'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 4,
      marks: [{ type: 'definitionText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 5,
      focusKey: textLeaf.key,
      focusOffset: 15,
      marks: [{ type: 'definitionUrl' }]
    }
  ])
})

test('return decorations for definition with title', (assert) => {
  const template = '[1]: google.com "Google"'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 4,
      marks: [{ type: 'definitionText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 5,
      focusKey: textLeaf.key,
      focusOffset: 15,
      marks: [{ type: 'definitionUrl' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 16,
      focusKey: textLeaf.key,
      focusOffset: 24,
      marks: [{ type: 'definitionTitle' }]
    }
  ])
})

test('allow bold inside anchor tag', (assert) => {
  const template = '[**Google**](google.com)'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 12,
      marks: [{ type: 'linkText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 1,
      focusKey: textLeaf.key,
      focusOffset: 11,
      marks: [{ type: 'strong' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 13,
      focusKey: textLeaf.key,
      focusOffset: 24,
      marks: [{ type: 'linkUrl' }]
    }
  ])
})

test('allow emphasis inside anchor tag', (assert) => {
  const template = '[*Google*](google.com)'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 10,
      marks: [{ type: 'linkText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 1,
      focusKey: textLeaf.key,
      focusOffset: 9,
      marks: [{ type: 'emphasis' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 11,
      focusKey: textLeaf.key,
      focusOffset: 22,
      marks: [{ type: 'linkUrl' }]
    }
  ])
})

test('return decorations for definition reference', (assert) => {
  const template = 'Visit [Google][google]'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 6,
      focusKey: textLeaf.key,
      focusOffset: 14,
      marks: [{ type: 'linkReferenceText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 15,
      focusKey: textLeaf.key,
      focusOffset: 22,
      marks: [{ type: 'linkReferenceUrl' }]
    }
  ])
})
