import React from 'react';

type Props = {
  html: string;
};

function App({ html }: Props) {
  return (
    <>
      {html}
    </>
  );
}

export default App;
