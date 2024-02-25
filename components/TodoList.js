import { useState } from 'react';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    const taskToEdit = tasks[index];
    setEditTaskIndex(index);
    setEditTaskValue(taskToEdit.name);
  };

  const cancelEditing = () => {
    setEditTaskIndex(null);
    setEditTaskValue('');
  };

  const saveTask = () => {
    if (editTaskValue.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editTaskIndex].name = editTaskValue;
      setTasks(updatedTasks);
      setEditTaskIndex(null);
      setEditTaskValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {editTaskIndex === index ? (
              <input
                type="text"
                value={editTaskValue}
                onChange={(e) => setEditTaskValue(e.target.value)}
              />
            ) : (
              task.name
            )}
            {editTaskIndex === index ? (
              <>
                <button onClick={saveTask}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => toggleComplete(index)}>
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}