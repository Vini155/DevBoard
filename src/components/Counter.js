import { useDispatch } from "react-redux"
import { increment } from "../actions/counterActions"
import { useSelector } from 'react-redux'

export const Counter = () => {
    const counter = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <>
        <button onClick={()=> dispatch(increment())}>increment</button>
        <h2>{counter}</h2>
        </>
    )
}