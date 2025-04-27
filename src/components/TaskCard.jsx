import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";

export default function TaskCard({ task, taskList, setTaskList }) {
  const [posting, setPosting] = useState(false);

  function handleStatus() {
    const newStatus = task.status === "Incomplete" ? "Complete" : "Incomplete";
    setPosting(true);

    setTaskList(
      taskList.map((t) => {
        if (t.task_id === task.task_id) {
          t["status"] = newStatus;
        }
        return t;
      })
    );

    axios
      .patch(`https://dtsdevtechtest.onrender.com/api/tasks/${task.task_id}`, {
        status: newStatus,
      })
      .then(() => {
        console.log("done");
        setPosting(false);
      });
  }

  function handleDelete() {
    setTaskList(
      taskList.filter((t) => {
        return t.task_id !== task.task_id;
      })
    );
    axios
      .delete(`https://dtsdevtechtest.onrender.com/api/tasks/${task.task_id}`)
      .then(() => {
        console.log("done");
      });
  }

  return (
    <Card className="task-card">
      <CardBody>
        <Typography className="task-card-title">{task.title}</Typography>
        <Typography className="task-card-desc">{task.description}</Typography>
      </CardBody>
      <CardFooter className="task-card-footer">
        <Button disabled={posting ? true : false} onClick={handleStatus}>
          {task.status === "Incomplete" ? "Complete" : "Restore"}
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
