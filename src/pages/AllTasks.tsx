import { Plus } from "lucide-react";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import { useGetRecentTasks } from "../react-query/queriesAndMutations";
import Loader from "../components/Loader";
import { Models } from "appwrite";
import AddTaskForm from "../components/AddTaskForm";

const AllTasks = () => {
  const [openModel, setOpenModel] = useState(false);
  const { data: tasks, isLoading, isError, error } = useGetRecentTasks();

  if (isError) {
    return <h1>{error.message} </h1>;
  }
  return (
    <>
      <div className="flex  justify-between">
        <h1 className=" text-2xl font-bold relative before:absolute before:-bottom-1 before:left-0 before:bg-green-600 before:w-8 before:h-1">
          All Tasks
        </h1>
        <button
          type="button"
          className="p-2 bg-[#777] rounded-full hover:bg-[#555]"
          onClick={() => setOpenModel(true)}
        >
          <Plus />
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mt-8">
          {tasks?.documents.map((task: Models.Document) => (
            <TaskCard key={task.$id} task={task} />
          ))}
          <button
            className="flex justify-center items-center gap-1 py-20 rounded-lg border border-dashed text-center"
            onClick={() => setOpenModel(true)}
          >
            <Plus />
            Add New Task
          </button>
        </div>
      )}
      <AddTaskForm isOpen={openModel} setIsOpen={setOpenModel} />
    </>
  );
};

export default AllTasks;
