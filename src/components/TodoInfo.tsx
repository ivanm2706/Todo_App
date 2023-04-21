import React, {
  FC,
  useRef,
  useState,
  useEffect,
} from 'react';
import { MakeChange } from '../types/MakeChange';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  setTodos: MakeChange,
  changeTitle: number | null,
  setChangeTitle: React.Dispatch<React.SetStateAction<number | null>>,
};

export const TodoInfo: FC<Props> = ({
  todo,
  setTodos,
  changeTitle,
  setChangeTitle,
}) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const inputNewTitle = useRef<HTMLInputElement | null>(null);
  const hendlerRemove = (id: number) => {
    setTodos.remove([id]);
  };

  const hendlerToggler = (currentTodo: Todo) => {
    setTodos.toggle([{ ...currentTodo, completed: !todo.completed }]);
  };

  const hendlerDoubleClick = (id: number) => setChangeTitle(id);

  const hendlerNewTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setNewTitle(e.target.value);

  const hendlerKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!newTitle.trim()) {
        setTodos.remove([todo.id]);
        setChangeTitle(null);

        return;
      }

      setTodos.toggle([{ ...todo, title: newTitle }]);
      setChangeTitle(null);

      return;
    }

    if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setChangeTitle(null);
    }
  };

  const hendlerOnBlur = () => {
    setChangeTitle(null);
  };

  useEffect(() => inputNewTitle.current?.focus(), [changeTitle]);

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={(e) => {
            e.stopPropagation();
            hendlerToggler(todo);
          }}
        />
        <p
          onDoubleClick={() => hendlerDoubleClick(todo.id)}
        >
          {todo.title}
        </p>
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => hendlerRemove(todo.id)}
        />
      </div>
      <input
        ref={inputNewTitle}
        type="text"
        id="toggle-view"
        className="edit"
        value={newTitle}
        onChange={hendlerNewTitle}
        onKeyUp={hendlerKeyUp}
        onBlur={hendlerOnBlur}
      />
    </>
  );
};
