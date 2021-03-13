# markdown-editor

Node v14.16.0
Yarn v1.22.10

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/markdown-editor.svg)](https://www.npmjs.com/package/markdown-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save markdown-editor
```

## Usage

```tsx
import * as React from 'react';

import { Markdown } from 'markdown-editor';
import 'markdown-editor/dist/index.css';

const App = () => {
  return <Markdown placeholder={'Type `*` for commands'} triggerKey={'*'} />;
};

export default App;
```

## License

MIT © [Nikhil-Kumaran](https://github.com/Nikhil-Kumaran)
