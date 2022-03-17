const TodoList = ({ todos, setTodos }) => {
    const deleteItem = (e) => {
      const id = e.target.getAttribute("data-id");
      fetch(`http://localhost:8080/${id}`, {
        method: "DELETE"
      })
        .then((resp) => resp.json())
        .then((data) => {
          setTodos(data.todos);
        });
    };
  
    const todoItems = todos.map((todo) => (
      <li data-id={todo.id} onClick={deleteItem} key={todo.id}>
        {todo.text}
      </li>
    ));
    return <ul>{todoItems}</ul>;
  };
  
  export default TodoList;
  