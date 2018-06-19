# Slate Markdown Decorations

> Parses strings as markdown and returns decorations for inline styles. [Live demo]()

[![travis-image]][travis-url]
[![npm-image]][npm-url]

**The package size is `3.7KB` minified. However, it has peer dependencies on `remark-parse` and `unified`, which may increase the bundle size.**

## Installation

```shell
npm i slate-md-decorations

# for yarn
yarn add slate-md-decorations
```

Also make sure to install required `peer dependencies`.

```shell
npm i remark-parse unified
```

## Usage

```js
import decorations from 'slate-md-decorations'

class App extends React.Component {
  decorateNode = (node) => {
    return decorations(node)
  }

  render () {
    return <Editor
       decorateNode = { this.decorateNode }
    />
  }
}
```

## How it works?

The library takes the node as an input and then parses it's text using [remark](https://github.com/remarkjs/remark). Remark returns an AST, which is further used to create [Slate ranges](https://docs.slatejs.org/slate-core/range) with [Marks](https://docs.slatejs.org/slate-core/mark).

The entire process is pretty simple and performant due to the usage of remark.

## Mark types

Following is the list of mark types returned for different Markdown styles.

#### strong

The text wrapped inside `** **` will have mark of type `strong`.

```js
// Hello **world**

[{
  anchorKey: '2',
  anchorOffset: 6,
  focusKey: '2',
  focusOffset: 15,
  marks: [{ type: 'strong' }]
}]
```

#### emphasis

```js
// Hello *world*

[{
  anchorKey: '2',
  anchorOffset: 6,
  focusKey: '2',
  focusOffset: 13,
  marks: [{ type: 'emphasis' }]
}]
```

#### inlineCode

```js
// Hello `world`

[{
  anchorKey: '2',
  anchorOffset: 6,
  focusKey: '2',
  focusOffset: 13,
  marks: [{ type: 'inlineCode' }]
}]
```

#### strike

```js
// Hello ~~world~~

[{
  anchorKey: '2',
  anchorOffset: 6,
  focusKey: '2',
  focusOffset: 15,
  marks: [{ type: 'strike' }]
}]
```

#### link

```js
// Visit [Google](https://google.com)

[
  {
     anchorKey: '2',
     anchorOffset: 6,
     focusKey: '2',
     focusOffset: 14,
     marks: [{ type: 'linkText' }]
  },
  {
     anchorKey: '2',
     anchorOffset: 15,
     focusKey: '2',
     focusOffset: 34,
     marks: [{ type: 'linkUrl' }]
  }
]
```

#### link with title

```js
// Visit [Google](https://google.com "Google")

[
  {
    anchorKey: '2',
    anchorOffset: 6,
    focusKey: '2',
    focusOffset: 14,
    marks: [{ type: 'linkText' }]
  },
  {
    anchorKey: '2',
    anchorOffset: 15,
    focusKey: '2',
    focusOffset: 33,
    marks: [{ type: 'linkUrl' }]
  },
  {
    anchorKey: '2',
    anchorOffset: 34,
    focusKey: '2',
    focusOffset: 43,
    marks: [{ type: 'linkTitle' }]
  }
]
```

#### definitions

```js
// [1]: google.com

[
  {
    anchorKey: '2',
    anchorOffset: 0,
    focusKey: '2',
    focusOffset: 4,
    marks: [{ type: 'definitionText' }]
  },
  {
    anchorKey: '2',
    anchorOffset: 5,
    focusKey: '2',
    focusOffset: 15,
    marks: [{ type: 'definitionUrl' }]
  }
]
```

#### definition reference

```js
// Visit [Google][google]

[
  {
    anchorKey: '2',
    anchorOffset: 6,
    focusKey: '2',
    focusOffset: 14,
    marks: [{ type: 'linkReferenceText' }]
  },
  {
    anchorKey: '2',
    anchorOffset: 15,
    focusKey: '2',
    focusOffset: 22,
    marks: [{ type: 'linkReferenceUrl' }]
  }
]
```

## Change log

The change log can be found in the [CHANGELOG.md](https://github.com/thetutlage/slate-md-decorations/CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md).

## Authors & License
[thetutlage](https://github.com/thetutlage) and [contributors](https://github.com/thetutlage/slate-md-decorations/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[travis-image]: https://img.shields.io/travis/thetutlage/slate-md-decorations/master.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/thetutlage/slate-md-decorations "travis"

[npm-image]: https://img.shields.io/npm/v/slate-md-decorations.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.org/package/slate-md-decorations "npm"
