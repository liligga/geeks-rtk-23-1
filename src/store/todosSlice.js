import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        return axios.get('https://dummyjson.com/todos')
            .then(resp => resp.data)
    }
)

export const asyncDeleteTodo = createAsyncThunk(
    'todos/asyncDeleteTodo',
    async (id) => {
        return axios.delete(`https://dummyjson.com/todos/${id}`)
            .then(resp => resp.data)
    }
)

export const asyncCreateTodo = createAsyncThunk(
    'todos/asyncCreateTodo',
    async ({todo, completed, userId}) => {

    }
)


const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: ''
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, state => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload.todos
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(asyncDeleteTodo.fulfilled, (state, action) => {
            const ind = state.items.findIndex(
                item => item.id === action.payload.id
            )
            if (ind > -1) {
                state.items.splice(ind, 1)
            }
        })

    }
})

export const {addTodo, removeTodo} = todosSlice.actions
export default todosSlice.reducer