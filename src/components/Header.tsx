import React, { useEffect, useRef, useState } from 'react';
import { MakeChange } from '../types/MakeChange';

type Props = {
  setTodos: MakeChange,
};

export const Header: React.FC<Props> = ({
  setTodos,
}) => {
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const hendlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const hendlerForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim()) {
      setTodos.add({
        id: Date.now(),
        completed: false,
        title: value,
      });
    }

    setValue('');
  };

  return (
    <header>
      <h1 className="todoapp__title">todos</h1>

      <form onSubmit={hendlerForm}>
        <input
          ref={input}
          type="text"
          data-cy="createTodo"
          className="input input--newTodo"
          placeholder="What needs to be done?"
          value={value}
          onChange={hendlerInput}
        />
      </form>
    </header>
  );
};
