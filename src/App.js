import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const {isLoading, error,sendRequest : fetchTasks} = useHttp();
  const [tasks, setTasks] = useState([]);

 

 
  useEffect(() => {

    /*
      we can also define transformData outside the useEffect; But in that case we need to wrap this function with useCallback;
      In case of define transformData outside, we need to use useCallback and define it's dependency; as we are seeing below 
      we don't need to define any dependency. We also need to use useMemo for requestConfig(url,method).
    */
    const transformData = (data) => {
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks);
    }

    
    fetchTasks({url: 'https://udemy-couse.firebaseio.com/tasks.json' , method:'GET'},transformData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
