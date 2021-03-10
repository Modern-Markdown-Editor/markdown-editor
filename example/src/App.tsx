import * as React from 'react';

import { Markdown } from 'markdown-editor';
import 'markdown-editor/dist/index.css';

const App = () => {
  return <Markdown placeholder={'Type Something //'} triggerKey={'*'} />;
  // return <div>Hello</div>;
};

export default App;
