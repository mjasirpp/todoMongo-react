import './App.css';
import React, { useState, useEffect } from 'react';
import { getAllTodos,uploadTodos,deleteATodo,updateTodo } from './services/allAPI';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
        const { data } = await getAllTodos();
        setTodos(data);
    } catch (err) {
        console.error(`Failed to fetch messages: ${err.message}`);
    }
  };

  const handleUpload = async () => {
    if (task.length === 0) {
        alert("No Message to upload");
        return;
    }
    try {
        console.log('uploading message before upload:', task);
        const response = await uploadTodos({ task });
        console.log('Response from uploadTask:', response);

        if (response.status >= 200 && response.status < 300) {
            alert("Task Added");
            setTodos([...todos, response.data]);
            setTask('');
        } else {
            alert("Upload failed with status: " + response.status);
        }
    } catch (error) {
        console.error('Error during upload:', error);
        alert('Failed to add Message');
    }
  };

  // const removeTodo = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/todos/${id}`);
  //     setTodos(todos.filter((todo) => todo._id !== id));
  //   } catch (error) {
  //     console.error('Error deleting todo:', error);
  //   }
  // };

  const removeTodo = async (id) => {
    try {
        await deleteATodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
        console.error(`Failed to delete message: ${err.message}`);
    }
  };

  const startEditing = (id, currentTodo) => {
    setEditId(id);
    setNewTodo(currentTodo);
  };

const cancelEdit = () => {
    setEditId(null);
    setNewTodo('');
};

const saveEdit = async (id) => {
    try {
          const response = await updateTodo(id, newTodo);

          // Update the todos state with the updated task
          setTodos(todos.map(todo => 
              todo._id === id ? { ...todo, task: response.data.task } : todo
          ));
        // await updateTodo(id, newTodo);
        setEditId(null);
        setNewTodo('');
    } catch (err) {
        console.error(`Failed to update Todo: ${err.message}`);
    }
};

useEffect(() => {
  fetchTodos();
}, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleUpload}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <button onClick={() => removeTodo(todo._id)}>Delete</button>
            {todo.task}
            {editId === todo?._id ? (
              <>
                <textarea
                  type='text'
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}/>
                    <button onClick={() => saveEdit(todo?._id)}>
                      Save
                    </button>
                    <button onClick={cancelEdit}>
                      Cancel
                    </button>                                                    
              </>
            ) : (
              <>                                   
                <button onClick={() => startEditing(todo?._id, todo.task)}>
                  Edit 
                </button>
              </>
            )}
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default App;