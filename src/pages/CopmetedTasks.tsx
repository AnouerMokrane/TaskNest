import { Models } from "appwrite";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import Loader from "../components/Loader";
import AddTaskForm from "../components/AddTaskForm";
import { useGetRecentTasks } from "../react-query/queriesAndMutations";

const CopmetedTasks = () => {
  const [openModel, setOpenModel] = useState(false);
  const { data, isLoading } = useGetRecentTasks();

  const completedTask = data?.documents.filter((task) => {
    return task.completed === true;
  });

  return (
    <>
      <h1 className=" text-2xl font-bold relative before:absolute before:-bottom-1 before:left-0 before:bg-green-600 before:w-8 before:h-1">
        Completed Tasks
      </h1>
      {completedTask?.length === 0 ? (
        <h2 className="mt-6">No completed tasks to show</h2>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mt-8">
          {completedTask?.map((task: Models.Document) => (
            <TaskCard key={task.$id} task={task} />
          ))}
        </div>
      )}
      <AddTaskForm isOpen={openModel} setIsOpen={setOpenModel} />
    </>
  );
};

export default CopmetedTasks;
