type AppProps = {
  html: string;
};

const App = ({ html }: AppProps) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default App;
