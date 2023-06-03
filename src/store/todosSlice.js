import {createSlice, nanoid} from '@reduxjs/toolkit'


const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: []
    },
    reducers: {
        addTodo: (state, action) => {
            // immer
            const todo = {
                id: nanoid(),
                title: action.payload,
                completed: false
            }
            state.items.push(todo)
        },
        removeTodo: (state, action) => {
            const ind = state.items.findIndex(
                item => item.id === action.payload
            )
            if (ind > -1) {
                state.items.splice(ind, 1)
            }
        },
        toggleCompleted: (state, action) => {
            const ind = state.items.findIndex(
                item => item.id === action.payload
            )
            if (ind > -1) {
                state.items[ind].completed = !state.items[ind].completed
            }
        }
    }
})

export const {addTodo, removeTodo} = todosSlice.actions
export default todosSlice.reducer