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
      anchorOffset: 7,
      focusKey: textLeaf.key,
      focusOffset: 13,
      marks: [{ type: 'linkText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 15,
      focusKey: textLeaf.key,
      focusOffset: 33,
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
      anchorOffset: 7,
      focusKey: textLeaf.key,
      focusOffset: 13,
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
      focusOffset: 42,
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
      anchorOffset: 1,
      focusKey: textLeaf.key,
      focusOffset: 2,
      marks: [{ type: 'definitionText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 4,
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
      anchorOffset: 1,
      focusKey: textLeaf.key,
      focusOffset: 2,
      marks: [{ type: 'definitionText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 4,
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
      anchorOffset: 1,
      focusKey: textLeaf.key,
      focusOffset: 11,
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
      focusOffset: 23,
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
      anchorOffset: 1,
      focusKey: textLeaf.key,
      focusOffset: 9,
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
      focusOffset: 21,
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
      anchorOffset: 7,
      focusKey: textLeaf.key,
      focusOffset: 13,
      marks: [{ type: 'linkReferenceText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 15,
      focusKey: textLeaf.key,
      focusOffset: 21,
      marks: [{ type: 'linkReferenceUrl' }]
    }
  ])
})

test('do not return decorations when link is empty', (assert) => {
  const template = 'Visit []()'

  const node = getNode(template)
  const decorations = getDecorations(node)
  assert.deepEqual(decorations, [])
})

test('allow inline code inside strong', (assert) => {
  const template = '**Hello `world`**'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 17,
      marks: [{ type: 'strong' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 8,
      focusKey: textLeaf.key,
      focusOffset: 15,
      marks: [{ type: 'inlineCode' }]
    }
  ])
})

test('allow strong inside emphasis', (assert) => {
  const template = '*Hello **world** *'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 18,
      marks: [{ type: 'emphasis' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 7,
      focusKey: textLeaf.key,
      focusOffset: 16,
      marks: [{ type: 'strong' }]
    }
  ])
})

test('allow strong inside strike', (assert) => {
  const template = '~~Hello **world**~~'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 19,
      marks: [{ type: 'strike' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 8,
      focusKey: textLeaf.key,
      focusOffset: 17,
      marks: [{ type: 'strong' }]
    }
  ])
})

test('return decorations for images', (assert) => {
  const template = '![Alt text](foo.jpg)'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 2,
      focusKey: textLeaf.key,
      focusOffset: 10,
      marks: [{ type: 'imageAlt' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 12,
      focusKey: textLeaf.key,
      focusOffset: 19,
      marks: [{ type: 'imageUrl' }]
    }
  ])
})

test('return decorations for images without alt', (assert) => {
  const template = '![](foo.jpg)'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 2,
      focusKey: textLeaf.key,
      focusOffset: 2,
      marks: [{ type: 'imageAlt' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 4,
      focusKey: textLeaf.key,
      focusOffset: 11,
      marks: [{ type: 'imageUrl' }]
    }
  ])
})

test('return decorations for images with title', (assert) => {
  const template = '![](foo.jpg "Foo")'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 2,
      focusKey: textLeaf.key,
      focusOffset: 2,
      marks: [{ type: 'imageAlt' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 4,
      focusKey: textLeaf.key,
      focusOffset: 11,
      marks: [{ type: 'imageUrl' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 12,
      focusKey: textLeaf.key,
      focusOffset: 17,
      marks: [{ type: 'imageTitle' }]
    }
  ])
})

test('return decorations for images with title and alt', (assert) => {
  const template = '![hello](foo.jpg "Foo")'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 2,
      focusKey: textLeaf.key,
      focusOffset: 7,
      marks: [{ type: 'imageAlt' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 9,
      focusKey: textLeaf.key,
      focusOffset: 16,
      marks: [{ type: 'imageUrl' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 17,
      focusKey: textLeaf.key,
      focusOffset: 22,
      marks: [{ type: 'imageTitle' }]
    }
  ])
})

test('return decorations for heading', (assert) => {
  const template = '## Hello world'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 2,
      marks: [{ type: 'headingHash' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 3,
      focusKey: textLeaf.key,
      focusOffset: 14,
      marks: [{ type: 'headingText' }]
    }
  ])
})

test('return decorations for heading with link', (assert) => {
  const template = '## [Hello world](foo.com)'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 2,
      marks: [{ type: 'headingHash' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 3,
      focusKey: textLeaf.key,
      focusOffset: 25,
      marks: [{ type: 'headingText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 4,
      focusKey: textLeaf.key,
      focusOffset: 15,
      marks: [{ type: 'linkText' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 17,
      focusKey: textLeaf.key,
      focusOffset: 24,
      marks: [{ type: 'linkUrl' }]
    }
  ])
})

test('return decorations for heading with no content', (assert) => {
  const template = '## '

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 0,
      focusKey: textLeaf.key,
      focusOffset: 2,
      marks: [{ type: 'headingHash' }]
    },
    {
      anchorKey: textLeaf.key,
      anchorOffset: 3,
      focusKey: textLeaf.key,
      focusOffset: 3,
      marks: [{ type: 'headingText' }]
    }
  ])
})

test('return decorations inside blockquote', (assert) => {
  const template = '> hello **world**'

  const node = getNode(template)
  const decorations = getDecorations(node)
  const textLeaf = node.getTexts().toArray()[0]

  assert.deepEqual(decorations, [
    {
      anchorKey: textLeaf.key,
      anchorOffset: 8,
      focusKey: textLeaf.key,
      focusOffset: 17,
      marks: [{ type: 'strong' }]
    }
  ])
})
