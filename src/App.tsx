import React, { useState } from 'react';

type Todo = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
};

const initialTodos: Todo[] = [
  // This would be your initial state, perhaps fetched from an API
];

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(), // simplistic unique ID generation
      title,
      description,
      tags: selectedTags,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedTags([]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>Daily Todo</h1>
      {todos.map(todo => (
        <div key={todo.id}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          {/* Display tags */}
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
      {/* Form for adding a new todo */}
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      {/* Tags selection - assuming tags are predefined */}
      
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default App;
