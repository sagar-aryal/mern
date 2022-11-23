import { useFetch } from "../hooks/useFetch";
import Form from "./Form";
import TodosLists from "./TodosLists";
import { TodosContext } from "../usecontext/TodosContext";
import { useEffect, useState } from "react";

const Todos = () => {
  const [input, setInput] = useState({
    title: "",
  });
  const [todos, setTodos] = useState([]);
  const [data, error, loading] = useFetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  useEffect(() => {
    setTodos((_) => data);
  }, [data]);

  const handleChange = (e) => {
    setInput((_) => ({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prev) => [
      { ...input, completed: false, id: todos.length + 1 },
      ...prev,
    ]);
    setInput({
      title: "",
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        error,
        loading,
        setTodos,
        input,
        handleChange,
        handleSubmit,
      }}
    >
      <Form />
      <TodosLists />
    </TodosContext.Provider>
  );
};

export default Todos;
