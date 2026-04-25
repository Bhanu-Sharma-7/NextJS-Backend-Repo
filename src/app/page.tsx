// Actions aur components ko import kiya.
import { getTodos, addTodo } from './actions';
import TodoItem from './components/TodoItem';

// Home function ek async component hai (Server Component).
export default async function Home() {
  // Database se saare tasks fetch kar rahe hain.
  const todos = await getTodos();

  return (
    <main>
      <div className="container">
        <h1>Task Manager</h1>
        
        {/* Naya task add karne wala form. 'addTodo' server action use karta hai. */}
        <form action={addTodo} className="todo-form">
          <input 
            type="text" 
            name="title" 
            placeholder="Add a new task..." 
            className="todo-input"
            required 
          />
          <button type="submit" className="btn-add">Add</button>
        </form>

        {/* Saare tasks ki list dikhane ke liye section */}
        <ul className="todo-list">
          {/* List ko loop karke har task ke liye TodoItem component banate hain */}
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          
          {/* Agar list khaali hai toh ye message dikhega */}
          {todos.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              No tasks yet. Add one above!
            </p>
          )}
        </ul>
      </div>
    </main>
  );
}
