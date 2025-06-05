import { Trash2 } from "lucide-react";

export default function TodoItem({
    todo,
    index,
    deleteTodo,
    toggleComplete,
    toggleEdit,
    updateTodo
}) {
    const overdue =
        todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

    return (
        <tr className="border-b">
            {/* task / edit */}
            <td className="py-2 px-2">
                {todo.isEditing ? (
                    <input
                        value={todo.text}
                        onChange={(e) => updateTodo(index, e.target.value)}
                        onBlur={() => toggleEdit(index)}
                        className="border px-2 py-1 rounded w-full"
                    />
                ) : (
                    <div className="flex justify-between items-center">
                        <span className={todo.completed ? "line-through text-gray-500" : ""}>
                            {todo.text}
                        </span>
                        <button
                            onClick={() => toggleEdit(index)}
                            className="ml-2 text-xs text-blue-500 underline hover:text-blue-700 shrink-0"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </td>

            {/* priority */}
            <td className="py-2 px-2">
                <span
                    className={`px-2 py-1 text-xs rounded ${todo.priority === "High"
                            ? "bg-red-300 text-red-800"
                            : todo.priority === "Medium"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-green-200 text-green-800"
                        }`}
                >
                    {todo.priority}
                </span>
            </td>

            {/* due date */}
            <td className="py-2 px-2">
                {todo.dueDate ? (
                    <span
                        className={`text-xs ${overdue ? "text-red-600 font-semibold" : "text-gray-700"
                            }`}
                    >
                        {todo.dueDate}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">—</span>
                )}
            </td>

            {/* status toggle */}
            <td className="py-2 px-2">
                <span
                    onClick={() => toggleComplete(index)}
                    className={`px-2 py-1 text-xs rounded cursor-pointer ${todo.completed
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                >
                    {todo.completed ? "Completed" : "Pending"}
                </span>
            </td>

            {/* delete */}
            <td className="py-2 px-2 text-center">
                <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="delete"
                >
                    <Trash2 size={18} />
                </button>
            </td>
        </tr>
    );
}
