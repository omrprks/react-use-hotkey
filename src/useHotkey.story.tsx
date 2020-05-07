import React, { ReactElement, useState } from 'react';

import useHotkey from '.';

export default {
  title: 'useHotKey',
};

export const Default = (): ReactElement => {
  const [text, setText] = useState('');
  useHotkey('*', () => setText('Key Pressed'), {
    preventDefault: false,
    stopPropagation: false,
  });

  return <div>{text}</div>;
};
