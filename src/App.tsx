import React, { useState } from 'react'
import './App.css'

type Todo = {
    id: number
    title: string
    description: string
    tags: string[]
    completed: boolean
}

const initialTodos: Todo[] = [
    {
        id: 1,
        title: 'Lorem ipsum dolor',
        description:
            'Lorem ipsum dolor sit amet, consectetura adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        tags: ['P1', 'Health'],
        completed: false
    },
    {
        id: 2,
        title: 'i am test',
        description: 'asdjalsdjlasjd',
        tags: ['1', '2'],
        completed: false
    },
    {
        id: 3,
        title: 'i am test',
        description: 'asdjalsdjlasjd',
        tags: ['1', '2'],
        completed: false
    },
    {
        id: 4,
        title: 'i am test',
        description: 'asdjalsdjlasjd',
        tags: ['1', '2'],
        completed: false
    }
    // This would be your initial state, perhaps fetched from an API
]

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const addTodo = () => {
        const newTodo: Todo = {
            id: Date.now(), // simplistic unique ID generation
            title,
            description,
            tags: selectedTags,
            completed: false
        }
        setTodos([...todos, newTodo])
        // Reset form
        setTitle('')
        setDescription('')
        setSelectedTags([])
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    }

    return (
        <div className='app'>
            <h1 className='app-header'>Daily Todo</h1>
            {todos.map(todo => (
                <div className='card' key={todo.id}>
                    <h2 className='card-title'>{todo.title}</h2>
                    <p className='card-desc'>{todo.description}</p>
                    <div className='card-tag-wrapper'>
                        {todo.tags.map(tag => (
                            <div className='card-tag'>{tag}</div>
                        ))}
                    </div>
                </div>
            ))}
            <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Description' />

            <div className='add-content'>
                <input className='title-input input' />
                <textarea className='desc-input input' />
                <div className='tags-input input'>
                    {todo.tags.map(tag => (
                        <div className='card-tag'>{tag}</div>
                    ))}
                </div>
                <div className='card-tag-wrapper'>
                    {todo.tags.map(tag => (
                        <div className='card-tag'>{tag}</div>
                    ))}
                </div>
            </div>

            <div className='add-wrapper'>
                <div className='add-button' onClick={addTodo}>
                    <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M20 14V26M26 20H14M38 20C38 22.3638 37.5344 24.7044 36.6298 26.8883C35.7252 29.0722 34.3994 31.0565 32.7279 32.7279C31.0565 34.3994 29.0722 35.7252 26.8883 36.6298C24.7044 37.5344 22.3638 38 20 38C17.6362 38 15.2956 37.5344 13.1117 36.6298C10.9278 35.7252 8.94353 34.3994 7.27208 32.7279C5.60062 31.0565 4.27475 29.0722 3.37017 26.8883C2.46558 24.7044 2 22.3638 2 20C2 15.2261 3.89642 10.6477 7.27208 7.27208C10.6477 3.89642 15.2261 2 20 2C24.7739 2 29.3523 3.89642 32.7279 7.27208C36.1036 10.6477 38 15.2261 38 20Z'
                            stroke='#E2E8F0'
                            stroke-width='3'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default App
