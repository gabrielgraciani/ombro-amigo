import { useSelector } from 'react-redux';

import { AppState } from 'redux/reducers/rootReducer';
import ToastContainer from 'components/ToastContainer';

import BaseProps from 'interfaces/BaseProps';

const AppHandler = ({ children }: BaseProps): React.ReactElement => {
  const { list } = useSelector((state: AppState) => state.toast);

  return (
    <>
      <ToastContainer messages={list} />
      {children}
    </>
  );
};

export default AppHandler;
