import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function CadastroCardapio() {
  const value = useSelector((state) => state.exampleReducer.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <h1>Contador: {value}</h1>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>Incrementar</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrementar</button>
      </div>
    </>
  )
}