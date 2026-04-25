import { getTodos, addTodo } from './actions';
import TodoItem from './components/TodoItem';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main>
      <div className="container">
        <h1>Task Manager</h1>
        
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

        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
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
