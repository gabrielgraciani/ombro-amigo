import GlobalStyles, { Main } from 'styles/globalStyles';

import { useSelector } from 'react-redux';

import { AppState } from 'redux/config/rootReducer';
import ToastContainer from 'components/ToastContainer';

import BaseProps from 'interfaces/BaseProps';

import { Header } from 'containers/Header';
import { Footer } from 'containers/Footer';

export default function AppHandler({
  children,
}: BaseProps): React.ReactElement {
  const { list } = useSelector((state: AppState) => state.toast);

  return (
    <>
      <GlobalStyles />

      <Header />
      <ToastContainer messages={list} />

      <Main>{children}</Main>

      <Footer />
    </>
  );
}
