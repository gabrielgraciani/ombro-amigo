import { DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyles';

import { useSelector } from 'react-redux';

import { AppState } from 'redux/reducers/rootReducer';
import ToastContainer from 'components/ToastContainer';

import BaseProps from 'interfaces/BaseProps';
import { combineTheme, dark, light } from 'styles/themes';

import usePersistedState from 'hooks/usePersistedState';

export default function AppHandler({
  children,
}: BaseProps): React.ReactElement {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    'ombro-amigo-theme',
    combineTheme(light),
  );
  const { list } = useSelector((state: AppState) => state.toast);

  const toggleTheme = () => {
    setTheme(
      theme.title === 'light' ? combineTheme(dark) : combineTheme(light),
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <button type="button" onClick={toggleTheme}>
          change theme
        </button>

        <ToastContainer messages={list} />
        {children}
      </ThemeProvider>
    </>
  );
}
