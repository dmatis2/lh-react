import { useState } from "react";

const TodoInput = ({ setTodos }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: inputValue
      })
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTodos(data.todos);
        setInputValue("");
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add new todo"
      />
      <input type="submit" value="Add todo" />
    </form>
  );
};

export default TodoInput;
