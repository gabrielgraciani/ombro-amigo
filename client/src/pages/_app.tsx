import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import GlobalStyles from 'styles/globalStyles';
import store from 'redux/store/store';

import AppHandler from 'containers/AppHandler/AppHandler';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>Ombro Amigo</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A simple project starter to work with Typescript, React, NextJS and Styled Components"
        />
      </Head>

      <Provider store={store}>
        <AppHandler>
          <Component {...pageProps} />
        </AppHandler>
      </Provider>
    </>
  );
}

export default App;
