import TodoItem from "./TodoItem";

export default function TodoList({ todos, deleteTodo, toggleComplete }) {
    return (
        <ul>
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    todo={todo}
                    index={index}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                />
            ))}
        </ul>
    );
}
