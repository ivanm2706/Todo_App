import React, { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { MakeChange } from '../types/MakeChange';
import { Todo } from '../types/Todo';
import { LinksPath } from '../types/LinksPath';

type Props = {
  todos: Todo[],
  setTodos: MakeChange,
  amountCompletedTodos: number,
};

const filterLinks = [{
  title: 'All',
  to: LinksPath.All,
}, {
  title: 'Active',
  to: LinksPath.Active,
}, {
  title: 'Completed',
  to: LinksPath.Completed,
}];

export const Footer: FC<Props> = ({
  todos,
  setTodos,
  amountCompletedTodos,
}) => {
  const hendlerRemoveAll = () => {
    const completedTodos = todos
      .filter(todo => todo.completed === true);

    setTodos.remove(completedTodos.map(({ id }) => id));
  };

  return (
    <footer className="footer">
      <p className="footer__todoCount" data-cy="todosCounter">
        <strong>{todos.length - amountCompletedTodos}</strong>
        {' items left'}
      </p>

      <ul className="filters" data-cy="todosFilter">
        {filterLinks.map(({ title, to }) => (
          <li key={title} className="filters__list">
            <NavLink
              to={to}
              className={({ isActive }) => classNames(
                'filters__link',
                { 'filters__link--selected': isActive },
              )}
              replace
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>

      {todos.some(todo => todo.completed === true) && (
        <button
          type="button"
          className="button button--clearCompleted"
          onClick={hendlerRemoveAll}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
