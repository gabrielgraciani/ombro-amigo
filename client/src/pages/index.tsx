import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTodoRequest } from 'redux/todo/actions';

import { AppState } from 'redux/reducers/rootReducer';

const Home = (): React.ReactElement => {
  const dispatch = useDispatch();

  const { todos, pending, error } = useSelector(
    (state: AppState) => state.todo,
  );

  useEffect(() => {
    dispatch(fetchTodoRequest());
  }, [dispatch]);

  return (
    <div style={{ padding: '15px' }}>
      {pending && <div>Loading...</div>}
      {error ? (
        <div>Error</div>
      ) : (
        todos.map((todo, index) => (
          <div style={{ marginBottom: '10px' }} key={todo.id}>
            {`${index} . ${todo.title}`}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
