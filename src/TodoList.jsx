import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addTodo, removeTodo } from './store/todosSlice'

const TodoList = () => {
    const [todo, setTodo] = useState('')
    const {items} = useSelector(state => state.todos)
    const dispatch = useDispatch()
    return (
        <div><h5>TodoList</h5>
            <input 
                type="text"
                onChange={e => setTodo(e.target.value)}/>
            <button onClick={
                () => dispatch(addTodo(todo))
            }>Добавить</button>
            {items && 
                <ul>
                    {items.map( (item, i) => 
                        <li>
                            <button>
                                {item.completed ? 'x' : 'v'}
                            </button>
                            {item.title}
                        <button
                            onClick={
                                () => dispatch(removeTodo(item.id))
                            }
                        >X</button></li>
                    )}
                </ul>
            }

        </div>
    )
}
export default TodoList