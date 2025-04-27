import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

export default function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setError("");
    setIsLoading(true);
    axios
      .get(`https://dtsdevtechtest.onrender.com/api/tasks`)
      .then((response) => {
        setTaskList(response.data.tasks);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, []);

  return (
    <div className="task-list">
      <AddTask taskList={taskList} setTaskList={setTaskList} />
      {taskList.map((task) => {
        return (
          <div key={task.task_id}>
            <TaskCard task={task} setTaskList={setTaskList} />
          </div>
        );
      })}
    </div>
  );
}
