import { useState } from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import { increase } from './store/counterSlice'

function Counter() {
    const [val, setVal] = useState(1)
    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter.value)
    const onButtonClick = () => {
        dispatch(increase(val))
    }
    return (
      <>
        <input 
          type="number" 
          onChange={e => setVal(Number(e.target.value))}
          value={val}
          />
        <button onClick={onButtonClick}>+</button>
          {counter}
      </>
    )
}

export default Counter
