import * as React from 'react';

import { Markdown } from 'markdown-editor';
import 'markdown-editor/dist/index.css';

const App = () => {
  return <Markdown placeholder={'Type / for commands'} />;
};

export default App;
