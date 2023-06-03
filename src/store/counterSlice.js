import {createSlice} from '@reduxjs/toolkit'


const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increase: (state, action) => {
            // immer
            state.value += action.payload
        }
    }
})

export const {increase} = counterSlice.actions
export default counterSlice.reducer