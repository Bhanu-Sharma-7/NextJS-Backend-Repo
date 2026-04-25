'use client';

import { useState } from 'react';
import { toggleTodo, deleteTodo, updateTodoTitle } from '../actions';
import { Todo } from '../actions';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="todo-item">
      <div className="todo-content" style={{ flex: 1 }}>
        <form action={async () => {
          await toggleTodo(todo.id, !todo.completed);
        }}>
          <button type="submit" className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}>
            {todo.completed && '✓'}
          </button>
        </form>

        {isEditing ? (
          <form 
            className="edit-form" 
            style={{ flex: 1, display: 'flex', gap: '0.5rem' }}
            action={async (formData) => {
              await updateTodoTitle(todo.id, formData);
              setIsEditing(false);
            }}
          >
            <input 
              type="text" 
              name="title" 
              defaultValue={todo.title} 
              autoFocus 
              className="todo-input"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
            />
            <button type="submit" className="btn-add" style={{ padding: '0.25rem 0.75rem' }}>Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn-delete" style={{ background: 'rgba(255,255,255,0.05)' }}>Cancel</button>
          </form>
        ) : (
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
        )}
      </div>
      
      <div className="todo-actions" style={{ display: 'flex', gap: '0.25rem' }}>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn-delete" title="Edit">
            ✎
          </button>
        )}
        <form action={async () => {
          await deleteTodo(todo.id);
        }}>
          <button type="submit" className="btn-delete" title="Delete">
            🗑
          </button>
        </form>
      </div>
    </li>
  );
}
