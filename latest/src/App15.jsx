import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment,decrement } from '../redux/Slices/ArithmeticSlice';
export default function App15() {
  const count = useSelector((state)=>state.arithmeticFunc.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div className='flex gap-8 p-4'>
        <button className='border-2 border-gray-500 p-3 rounded-2xl bg-amber-200 shadow-lg shadow-gray-500'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className='text-2xl text-blue-600'>{count}</span>
        <button className='border-2 border-gray-500 p-3 rounded-2xl bg-amber-200 shadow-lg shadow-gray-500'
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}