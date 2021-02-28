import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTodoRequest } from 'redux/todo/actions';

import { AppState } from 'redux/config/rootReducer';
import ToastContainer from '../components/ToastContainer';

const Home = (): React.ReactElement => {
  const dispatch = useDispatch();

  const { todos, pending, error } = useSelector(
    (state: AppState) => state.todo,
  );

  const { list } = useSelector((state: AppState) => state.toast);

  useEffect(() => {
    dispatch(fetchTodoRequest());
  }, [dispatch]);

  return (
    <>
      <ToastContainer messages={list} />

      <div style={{ padding: '15px' }}>
        {pending && <div>Loading...</div>}
        {error ? (
          <div>{error}</div>
        ) : (
          todos.map((todo, index) => (
            <div style={{ marginBottom: '10px' }} key={todo.id}>
              {`${index} . ${todo.title}`}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
