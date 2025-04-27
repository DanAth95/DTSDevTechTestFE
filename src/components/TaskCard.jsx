import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function TaskCard({ task, setTaskList }) {
  return (
    <Card className="task-card">
      <CardBody>
        <Typography className="task-card-title">{task.title}</Typography>
        <Typography className="task-card-desc">{task.description}</Typography>
      </CardBody>
      <CardFooter className="task-card-footer">
        <Button>Complete</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>
  );
}
