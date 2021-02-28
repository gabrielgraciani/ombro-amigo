import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import store from 'redux/config/store';

import { ThemeProvider } from 'hooks/useTheme';

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
        <ThemeProvider>
          <AppHandler>
            <Component {...pageProps} />
          </AppHandler>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
