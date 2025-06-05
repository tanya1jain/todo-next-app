import TodoItem from "./TodoItem";

export default function TodoList({
    todos,
    deleteTodo,
    toggleComplete,
    toggleEdit,
    updateTodo
}) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead>
                    <tr className="border-b font-semibold">
                        <th className="py-2 px-2">Task</th>
                        <th className="py-2 px-2">Priority</th>
                        <th className="py-2 px-2">Due Date</th>
                        <th className="py-2 px-2">Status</th>
                        <th className="py-2 px-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, idx) => (
                        <TodoItem
                            key={idx}
                            todo={todo}
                            index={idx}
                            deleteTodo={deleteTodo}
                            toggleComplete={toggleComplete}
                            toggleEdit={toggleEdit}
                            updateTodo={updateTodo}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
