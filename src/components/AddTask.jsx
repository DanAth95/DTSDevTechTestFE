import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";

export default function AddTask({ taskList, setTaskList }) {
  const [title, setTitle] = useState("Task Title");
  const [desc, setDesc] = useState("Description...");
  const [date, setDate] = useState("");
  const [posting, setPosting] = useState(false);

  function handleSubmit(e) {
    setPosting(true);

    const newTask = {
      title: title,
      description: desc,
      status: "Incomplete",
      due_date: date,
      due_time: "12:00:00",
    };

    setTaskList([...taskList, newTask]);
    axios
      .post(`https://dtsdevtechtest.onrender.com/api/tasks`, newTask)
      .then(() => {
        console.log("done");
        setPosting(false);
        setTitle("");
        setDesc("");
        setDate("");
      })
      .catch((err) => {
        setError(true);
      });
  }

  return (
    <Card className="task-card">
      <CardBody>
        <Typography className="task-card-title">
          <input
            className="title-input"
            type="text"
            name="title"
            value={title}
            onClick={(e) => {
              if (e.target.value === "Task Title") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Task Title";
              }
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </Typography>
        <Typography className="task-card-desc">
          <textarea
            rows="10"
            cols="50"
            className="desc-input"
            type="text"
            name="description"
            value={desc}
            onClick={(e) => {
              if (e.target.value === "Description...") {
                e.target.value = "";
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = "Description...";
              }
            }}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </Typography>
      </CardBody>
      <CardFooter className="task-card-footer">
        <input
          type="date"
          name="due_date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></input>
        <Button
          disabled={posting ? true : false}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
