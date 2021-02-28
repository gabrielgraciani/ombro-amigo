import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTodoRequest } from 'redux/todo/actions';

import { AppState } from 'redux/config/rootReducer';

import { useTheme } from '../hooks/useTheme';

const Home = (): React.ReactElement => {
  const dispatch = useDispatch();

  const { toggleTheme } = useTheme();

  const { todos, pending, error } = useSelector(
    (state: AppState) => state.todo,
  );

  useEffect(() => {
    dispatch(fetchTodoRequest());
  }, [dispatch]);

  return (
    <>
      <button type="button" onClick={toggleTheme}>
        change theme
      </button>

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
