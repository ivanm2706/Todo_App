import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { MakeChange } from '../types/MakeChange';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
  setTodos: MakeChange,
  isCompletedTodo: boolean,
};

export const TodoList: FC<Props> = ({
  todos,
  setTodos,
  isCompletedTodo,
}) => {
  const [changeTitle, setChangeTitle] = useState<number | null>(null);

  const hendlerTogglerAll = () => {
    let allCompletedTodos = todos
      .filter(todo => todo.completed === false);

    if (!allCompletedTodos.length) {
      allCompletedTodos = [...todos];
    }

    setTodos.toggle(allCompletedTodos.map(todo => (
      { ...todo, completed: !todo.completed }
    )));
  };

  return (
    <section className="mainTodos">
      <input
        type="checkbox"
        id="toggle-all"
        className="input input--toggleAll mainTodos__toggleAll"
        data-cy="toggleAll"
        checked={isCompletedTodo}
        onClick={hendlerTogglerAll}
      />
      {/* eslint-disable-next-line */}
      <label
        className="mainTodos__label"
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>

      <ul className="todo-list * todoList" data-cy="todosList">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'todoList__item',
              { 'todoList__item--completed': todo.completed },
              { 'todoList__item--editing': changeTitle === todo.id },
            )}
          >
            <TodoInfo
              todo={todo}
              setTodos={setTodos}
              setChangeTitle={setChangeTitle}
              changeTitle={changeTitle}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
