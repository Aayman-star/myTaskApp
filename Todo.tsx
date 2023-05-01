import { useState } from "react";

// function Button({ title }) {
//   return <button>{title}</button>;
// }

const Todo = () => {
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState(false);
  //const [color, setColor] = useState("black");
  //const [done, setDone] = useState(false);
  //const [complete, setComplete] = useState(false);
  const [tasks, setTasks]: {
    id: number;
    Text: string;
    isComplete: false;
  }[] = useState([]);

  function handleChange(event) {
    setText(event.target.value);
  }
  function handleClick() {
    setDisplayText(true);
    const temp = { id: tasks.length, Text: text, isComplete: false };
    setTasks([...tasks, temp]);
  }
  function handleDone(index: number) {
    console.log(`task number ${index + 1} done`);
    console.log(tasks[index].Text, "done");
    setTasks(
      tasks.map((task) => {
        if (task.id === index) {
          return { ...task, isComplete: true };
        } else {
          return task;
        }
      })
    );
    console.log(tasks[index].isComplete.toString());
  }

  function handleDelete(index) {
    setTasks(tasks.filter((task) => task.id !== index));
  }
  function handleunDone(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: false };
        } else {
          return task;
        }
      })
    );
  }
  // const myTasks = tasks.map((task, id) => (
  //   <li className={task.isComplete ? "Done" : "Task"} key={task.id}>
  //     {task.Text}
  //     <button onClick={() => handleDone(task.id)}>Done</button>
  //     <button onClick={() => handleDelete(task.id)}>Delete</button>
  //   </li>
  // ));
  //List of tasks which have been marked as complete
  const completeTasks = tasks
    .filter((task) => task.isComplete)
    .map((task, id) => (
      <li className={"Done"} key={task.id}>
        {task.Text}
        <button onClick={() => handleunDone(task.id)}>unDone</button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </li>
    ));

  //List of tasks which are incomplete
  const incompleteTasks = tasks
    .filter((task) => !task.isComplete)
    .map((task, id) => (
      <li className={"Task"} key={task.id}>
        {task.Text}
        <button onClick={() => handleDone(task.id)}>Done</button>
        <button onClick={() => handleDelete(task.id)}>Delete</button>
      </li>
    ));

  return (
    <div>
      <h1>My Task List</h1>
      <div>
        <label htmlFor="text-input">WriteTask </label>
        <input
          type="text"
          id="text-input"
          value={text}
          onChange={handleChange}
          placeholder="Enter your Tasks"
        />
        <button onClick={handleClick}>Add Task</button>
      </div>
      <div>
        {tasks.length > 0
          ? displayText && <ol>{incompleteTasks}</ol>
          : "No tasks to show"}
      </div>
      <div>
        {completeTasks.length > 0 ? <h3>Completed Tasks</h3> : ""}
        <ol>{completeTasks}</ol>
      </div>
    </div>
  );
};
export default Todo;
