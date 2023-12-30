import { Plus, XCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddNewTask } from "../react-query/queriesAndMutations";

type TaskFormProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  important: boolean;
};

const AddTaskForm = ({ isOpen, setIsOpen }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      completed: false,
      important: false,
    },
  });

  const { mutateAsync: createTask, isPending } = useAddNewTask();

  const onSubmit = async (data: FormValues) => {
    try {
      await createTask(data);
      toast.success("Task added successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div
      className={`w-full h-screen absolute inset-0 justify-center items-center bg-slate-400/25 z-50 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <form
        className="flex relative flex-col gap-6 bg-black w-[450px] p-8 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          type="button"
          className=" absolute right-3 top-3"
          onClick={() => setIsOpen(false)}
        >
          <XCircle />
        </button>
        <h1 className="mb-3">Create New Task</h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="Title">
            Title
          </label>
          <input
            className="p-2 bg-[#333] rounded-md text-sm"
            type="text"
            {...register("title", {
              required: "This field is required",
              minLength: 4,
            })}
          />
          <p className=" text-red-600 text-xs">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="description">
            Description
          </label>
          <textarea
            className="h-24 p-2 bg-[#333] rounded-md text-sm"
            {...register("description", {
              required: "This field is required",
              minLength: 4,
            })}
          />
          <p className=" text-red-600 text-xs">{errors.description?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="date">
            Date
          </label>
          <input
            className="p-2 bg-[#333] rounded-md text-sm"
            type="date"
            {...register("date")}
          />
          <p className=" text-red-600 text-xs">{errors.date?.message}</p>
        </div>
        <div className="flex justify-between">
          <label className="text-sm" htmlFor="completed">
            Toggle Completed
          </label>
          <input type="checkbox" {...register("completed")} />
        </div>
        <div className="flex justify-between">
          <label className="text-sm" htmlFor="important">
            Toggle Important
          </label>
          <input type="checkbox" {...register("important")} />
        </div>
        <button className="flex gap-1 bg-blue-800 p-2 rounded-md w-fit ms-auto">
          <Plus />
          {isPending ? "Creating..." : "Create New Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
