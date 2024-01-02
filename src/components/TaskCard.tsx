import { Models } from "appwrite";
import { Edit, Loader, Trash } from "lucide-react";
import {
  useDeleteTask,
  useUpdateTask,
} from "../react-query/queriesAndMutations";
import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import toast from "react-hot-toast";
import { updateTask } from "../appwrite/api";

type taskProps = {
  task: Models.Document;
};

const TaskCard = ({ task }: taskProps) => {
  const { mutateAsync: deleteTask, isPending } = useDeleteTask();
  const { mutateAsync: toggleCompleted, isPending: toggling } = useUpdateTask();
  const [openModel, setOpenModel] = useState(false);
  const { taskTiltle: title, taskText: description, date, completed } = task;

  const handleDelete = async () => {
    const res = await deleteTask(task.$id);

    if (res?.status === "ok") {
      toast.success("Task deleted successfully.");
    } else {
      toast.error("Delete task failed");
    }
  };
  const handleCompletedState = async () => {
    try {
      await toggleCompleted({
        taskId: task.$id,
        data: {
          title: task.taskTiltle,
          description: task.description,
          date: task.date,
          important: task.important,
          completed: !task.completed,
        },
      });
    } catch (error) {
      console.error("Error toggling completed state:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-6 bg-[#333233] rounded-lg p-4">
      <div>
        <h2 className=" text-lg font-semibold">{title} </h2>
        <p className=" text-sm mt-1 ">{description}</p>
      </div>
      <div>
        <span className=" text-sm">{date}</span>
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handleCompletedState}
            className={` ${toggling && "opacity-50"} ${
              completed ? "bg-green-600" : "bg-red-500"
            } py-2 px-4 rounded-full `}
          >
            {completed ? "Completed" : "Incompleted"}
          </button>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                setOpenModel(true);
              }}
            >
              <Edit width={18} />
            </button>
            <button onClick={handleDelete}>
              {isPending ? <Loader width={18} /> : <Trash width={18} />}
            </button>
          </div>
        </div>
      </div>
      <EditTaskForm
        isOpen={openModel}
        setIsOpen={setOpenModel}
        taskData={task}
      />
    </div>
  );
};

export default TaskCard;
