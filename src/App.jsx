import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {

  const [todos, setTodos] = useState([]);

  // Add
  const addTodo = (todo) => {
      // adding if todo contains value
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };


  // loacal store
  // => first time loading web page
  useEffect(() => {
    // 
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // after updating todoes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo , toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        
        <div className="w-full max-w-2xl mx-auto shadow-md  bg-black rounded-2xl m-1 px-4 py-3 text-white">
          <h1 className="text-5xl font-bold text-center mb-8 mt-2">
            My Todo
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>

          <div className="flex flex-wrap gap-y-3 p-2 bg-gray-300 rounded-xl">
            {/*Loop and Add TodoItem here */}
            {
               todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))

            }
          </div>
        </div>

      </div>
    </TodoProvider>
  );
}

export default App;
