import GlobalStyles from 'styles/globalStyles';

import { useSelector } from 'react-redux';

import { AppState } from 'redux/config/rootReducer';
import ToastContainer from 'components/ToastContainer';

import BaseProps from 'interfaces/BaseProps';

export default function AppHandler({
  children,
}: BaseProps): React.ReactElement {
  const { list } = useSelector((state: AppState) => state.toast);

  return (
    <>
      <GlobalStyles />

      <ToastContainer messages={list} />
      {children}
    </>
  );
}
