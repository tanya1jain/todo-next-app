export default function TodoItem({ todo, index, deleteTodo, toggleComplete }) {
    return (
        <li
            className={`flex justify-between items-center mb-2 p-2 rounded-md ${todo.completed ? "bg-green-100 line-through" : "bg-gray-100"
                }`}
        >
            <span>{todo.text}</span>
            <div className="flex gap-2">
                <button
                    onClick={() => toggleComplete(index)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                    ✔
                </button>
                <button
                    onClick={() => deleteTodo(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                    ❌
                </button>
            </div>
        </li>
    );
}
  