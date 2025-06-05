'use client';

import { useState, useEffect, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AuthForm from "../components/AuthForm";
import TodoList from "../components/TodoList";

export default function Home() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOption, setSortOption] = useState("");

  // Check login state (hook always called)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsub();
  }, []);

  // Load saved todos (hook always called)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) setTodos(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { text: input, completed: false, isEditing: false, priority, dueDate }
    ]);
    setInput("");
    setPriority("Medium");
    setDueDate("");
  };

  const deleteTodo = (idx) => setTodos(todos.filter((_, i) => i !== idx));
  const toggleComplete = (idx) =>
    setTodos(todos.map((t, i) => (i === idx ? { ...t, completed: !t.completed } : t)));
  const toggleEdit = (idx) =>
    setTodos(todos.map((t, i) => (i === idx ? { ...t, isEditing: !t.isEditing } : t)));
  const updateTodo = (idx, newText) =>
    setTodos(todos.map((t, i) => (i === idx ? { ...t, text: newText } : t)));

  const displayTodos = useMemo(() => {
    let list = [...todos];
    if (filterStatus !== "All") {
      list = list.filter((t) =>
        filterStatus === "Completed" ? t.completed : !t.completed
      );
    }
    if (filterPriority !== "All") {
      list = list.filter((t) => t.priority === filterPriority);
    }

    const prioRank = { High: 3, Medium: 2, Low: 1 };
    list.sort((a, b) => {
      if (sortOption === "dueAsc")
        return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      if (sortOption === "dueDesc")
        return new Date(b.dueDate || 0) - new Date(a.dueDate || 0);
      if (sortOption === "prioHigh")
        return prioRank[b.priority] - prioRank[a.priority];
      if (sortOption === "prioLow")
        return prioRank[a.priority] - prioRank[b.priority];
      return 0;
    });

    return list;
  }, [todos, filterStatus, filterPriority, sortOption]);

  const logout = () => signOut(auth);

  return (
    <>
      {!user ? (
        <AuthForm onAuthSuccess={setUser} />
      ) : (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 relative">
            <button
              onClick={logout}
              className="absolute top-4 right-4 bg-gray-200 text-black px-3 py-1 rounded"
            >
              Logout
            </button>

            <h1 className="text-2xl font-bold text-center mb-6">TODO List 🚀</h1>

            {/* input panel */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid gap-3 md:grid-cols-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Task…"
                className="border-b md:col-span-2 focus:outline-none px-2 py-1"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={addTodo}
                className="md:col-span-4 bg-gradient-to-r from-red-400 to-pink-400 text-white py-2 rounded-md shadow hover:opacity-90"
              >
                Add
              </button>
            </div>

            {/* filters */}
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="All">All Status</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="All">All Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="">No Sort</option>
                <option value="dueAsc">Due Date ↑</option>
                <option value="dueDesc">Due Date ↓</option>
                <option value="prioHigh">Priority High-Low</option>
                <option value="prioLow">Priority Low-High</option>
              </select>
            </div>

            <TodoList
              todos={displayTodos}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              toggleEdit={toggleEdit}
              updateTodo={updateTodo}
            />
          </div>
        </main>
      )}
    </>
  );
}
