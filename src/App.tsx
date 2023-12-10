import React, { useState, useEffect, useRef } from 'react'
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
        title: 'Complete Project Report',
        description: 'Finalize the report on the recent project and send it to the manager.',
        tags: ['1', '2'],
        completed: false
    },
    {
        id: 3,
        title: 'Grocery Shopping',
        description: 'Buy milk, eggs, bread, and vegetables from the local supermarket.',
        tags: ['1', '2'],
        completed: false
    },
    {
        id: 4,
        title: "Schedule Doctor's Appointment",
        description: "Call Dr. Smith's office to schedule a routine check-up appointment.",
        tags: ['1', '2'],
        completed: false
    },
    {
        id: 5,
        title: 'Plan Weekend Getaway',
        description: 'Research destinations, book hotels, and prepare an itinerary for a weekend trip.',
        tags: ['1', '2'],
        completed: false
    }
]

const TAGS = ['1', '2', '3', '4']

const App: React.FC = () => {
    const ref = useRef<HTMLInputElement>(null)
    const [todos, setTodos] = useState<Todo[]>(initialTodos)
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    // 自动滚动底部输入框
    useEffect(() => {
        if (isAdding === true) {
            ref.current?.scrollIntoView({ behavior: 'smooth' })
            ref.current?.focus()
        }
    }, [isAdding])

    const addTodo = () => {
        if (!title) {
            alert('title could not be empty')
            return
        }
        const newTodo: Todo = {
            id: Date.now(),
            title,
            description,
            tags: selectedTags,
            completed: false
        }
        setTodos([...todos, newTodo])
        setTitle('')
        setDescription('')
        setSelectedTags([])
        setIsAdding(false)
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    }

    const onDragStart = (event: React.DragEvent, id: number) => {
        event.dataTransfer.setData('id', id.toString())
    }

    const onDrop = (event: React.DragEvent, isCompleted: boolean) => {
        let id = parseInt(event.dataTransfer.getData('id'))
        if (isCompleted) {
            toggleComplete(id)
        } else {
            deleteTodo(id)
        }
    }

    return (
        <div className='app'>
            <div className='left'>
                <svg
                    onDrop={e => onDrop(e, false)}
                    onDragOver={e => e.preventDefault()}
                    className='delete'
                    width='142'
                    height='165'
                    viewBox='0 0 142 165'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M92.0883 58.8791L89.378 129.379M51.872 129.379L49.1617 58.8791M127.244 33.7341C129.923 34.1414 132.587 34.5722 135.25 35.0344M127.244 33.7419L118.878 142.484C118.537 146.912 116.537 151.047 113.278 154.064C110.019 157.08 105.741 158.755 101.3 158.754H39.9497C35.5089 158.755 31.2313 157.08 27.9723 154.064C24.7133 151.047 22.7131 146.912 22.3717 142.484L14.0057 33.7341M127.244 33.7341C118.204 32.3673 109.116 31.33 100 30.6242M6 35.0266C8.66333 34.5644 11.3267 34.1336 14.0057 33.7341M14.0057 33.7341C23.0464 32.3673 32.1338 31.33 41.25 30.6242M100 30.6242V23.4489C100 14.2056 92.8717 6.49758 83.6283 6.20775C74.9617 5.93075 66.2883 5.93075 57.6217 6.20775C48.3783 6.49758 41.25 14.2134 41.25 23.4489V30.6242M100 30.6242C80.4458 29.113 60.8042 29.113 41.25 30.6242'
                        stroke='#F3F4F6'
                        stroke-width='11.75'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
            </div>
            <div className='container'>
                <h1 className='app-header'>Daily Todo</h1>

                {todos
                    .filter(i => !i.completed)
                    .map(todo => (
                        <div draggable onDragStart={e => onDragStart(e, todo.id)} className='card' key={todo.id}>
                            <h2 className='card-title'>{todo.title}</h2>
                            {todo.description && <p className='card-desc'>{todo.description}</p>}
                            {todo.tags.length > 0 && (
                                <div className='card-tag-wrapper'>
                                    {todo.tags.map(tag => (
                                        <div className='card-tag'>{tag}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                {isAdding && (
                    <div className='add-content'>
                        <div className='input'>
                            <input
                                ref={ref}
                                className='title-input'
                                type='text'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder='Title'
                            />
                        </div>
                        <div className='input'>
                            <textarea
                                className='desc-input'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder='Description'
                            />
                        </div>
                        <div className='select-tags-list'>
                            {TAGS.map(tag => (
                                <div
                                    className={`select-tag ${selectedTags.includes(tag) && 'active'}`}
                                    onClick={() => setSelectedTags([...selectedTags, tag])}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <div className='add-content-confirm'>
                            <svg
                                onClick={() => setIsAdding(false)}
                                className='add-content-confirm-cancel'
                                width='51'
                                height='51'
                                viewBox='0 0 51 51'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M29.6196 21.1356L21.2843 29.7683M29.7683 29.6196L21.1356 21.2843M38.4009 37.9549C36.759 39.6554 34.7983 41.0158 32.6306 41.9585C30.4629 42.9012 28.1308 43.4078 25.7673 43.4492C23.4039 43.4906 21.0555 43.0661 18.8561 42.1999C16.6567 41.3337 14.6495 40.0428 12.949 38.4009C11.2485 36.759 9.88807 34.7982 8.94536 32.6306C8.00265 30.4629 7.49613 28.1308 7.45471 25.7673C7.41329 23.4039 7.83779 21.0554 8.70398 18.8561C9.57016 16.6567 10.8611 14.6495 12.503 12.949C15.819 9.5147 20.3634 7.53835 25.1366 7.4547C29.9097 7.37105 34.5206 9.18696 37.9549 12.503C41.3892 15.8189 43.3655 20.3634 43.4492 25.1365C43.5328 29.9097 41.7169 34.5206 38.4009 37.9549Z'
                                    stroke='#94A3B8'
                                    stroke-width='3'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                            <svg
                                onClick={addTodo}
                                className='add-content-confirm-ok'
                                width='40'
                                height='40'
                                viewBox='0 0 40 40'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M14.452 21.9517L18.952 26.4517L26.452 15.9517M38.452 20.4517C38.452 22.8155 37.9864 25.1561 37.0818 27.34C36.1772 29.5238 34.8513 31.5081 33.1799 33.1796C31.5084 34.851 29.5241 36.1769 27.3403 37.0815C25.1564 37.9861 22.8158 38.4517 20.452 38.4517C18.0882 38.4517 15.7475 37.9861 13.5637 37.0815C11.3798 36.1769 9.3955 34.851 7.72404 33.1796C6.05259 31.5081 4.72672 29.5238 3.82213 27.34C2.91755 25.1561 2.45197 22.8155 2.45197 20.4517C2.45197 15.6778 4.34839 11.0994 7.72404 7.72374C11.0997 4.34808 15.6781 2.45166 20.452 2.45166C25.2259 2.45166 29.8042 4.34808 33.1799 7.72374C36.5555 11.0994 38.452 15.6778 38.452 20.4517Z'
                                    stroke='#94A3B8'
                                    stroke-width='3'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </div>
                    </div>
                )}

                {!isAdding && (
                    <div className='add-wrapper'>
                        <div className='add-button' onClick={() => setIsAdding(true)}>
                            <svg
                                width='40'
                                height='40'
                                viewBox='0 0 40 40'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
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
                )}
            </div>

            <div className='right'>
                <svg
                    onDrop={e => onDrop(e, true)}
                    onDragOver={e => e.preventDefault()}
                    className='complete'
                    width='153'
                    height='153'
                    viewBox='0 0 153 153'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M53 82.375L70.625 100L100 58.875M147 76.5C147 85.7582 145.176 94.9257 141.634 103.479C138.091 112.033 132.898 119.804 126.351 126.351C119.804 132.898 112.033 138.091 103.479 141.634C94.9257 145.176 85.7582 147 76.5 147C67.2418 147 58.0743 145.176 49.5208 141.634C40.9674 138.091 33.1955 132.898 26.649 126.351C20.1024 119.804 14.9094 112.033 11.3665 103.479C7.82354 94.9257 6 85.7582 6 76.5C6 57.8022 13.4277 39.8703 26.649 26.649C39.8703 13.4277 57.8022 6 76.5 6C95.1978 6 113.13 13.4277 126.351 26.649C139.572 39.8703 147 57.8022 147 76.5Z'
                        stroke='#F1F5F9'
                        stroke-width='11.75'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
            </div>
        </div>
    )
}

export default App
