'use client'; // Ye batata hai ki ye component browser mein interact karega.

import { useState } from 'react'; // State manage karne ke liye (jaise editing mode on/off).
import { toggleTodo, deleteTodo, updateTodoTitle } from '../actions'; // Actions import kiye.
import { Todo } from '../actions'; // Type import kiya.

// Props jo humein parent (page.tsx) se milenge.
interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  // 'isEditing' state batati hai ki hum abhi edit kar rahe hain ya sirf dekh rahe hain.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="todo-item">
      <div className="todo-content" style={{ flex: 1 }}>
        {/* Checkbox toggle karne wala form */}
        <form action={async () => {
          await toggleTodo(todo.id, !todo.completed);
        }}>
          {/* Button jo checkbox ki tarah kaam karta hai */}
          <button type="submit" className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}>
            {todo.completed && '✓'}
          </button>
        </form>

        {/* Agar editing mode ON hai toh input field dikhao, warna sirf text */}
        {isEditing ? (
          <form 
            className="edit-form" 
            style={{ flex: 1, display: 'flex', gap: '0.5rem' }}
            action={async (formData) => {
              await updateTodoTitle(todo.id, formData); // Title update karo database mein.
              setIsEditing(false); // Editing mode OFF kar do.
            }}
          >
            <input 
              type="text" 
              name="title" 
              defaultValue={todo.title} // Purana naam pehle se likha hoga.
              autoFocus // Page load par cursor apne aap yahan aa jayega.
              className="todo-input"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
            />
            <button type="submit" className="btn-add" style={{ padding: '0.25rem 0.75rem' }}>Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn-delete" style={{ background: 'rgba(255,255,255,0.05)' }}>Cancel</button>
          </form>
        ) : (
          /* Normal text jo task ka naam dikhata hai. Agar task completed hai toh cut-through line ayegi. */
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
        )}
      </div>
      
      {/* Right side ke buttons: Edit aur Delete */}
      <div className="todo-actions" style={{ display: 'flex', gap: '0.25rem' }}>
        {!isEditing && (
          // Pencil icon par click karne se editing mode start ho jayega.
          <button onClick={() => setIsEditing(true)} className="btn-delete" title="Edit">
            ✎
          </button>
        )}
        <form action={async () => {
          await deleteTodo(todo.id); // Delete action trigger karo.
        }}>
          <button type="submit" className="btn-delete" title="Delete">
            🗑
          </button>
        </form>
      </div>
    </li>
  );
}
