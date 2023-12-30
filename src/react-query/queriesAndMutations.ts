import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addNewTask,
  createAccount,
  deleteSession,
  deleteTask,
  getRecentTasks,
  signInAccount,
  updateTask,
} from "../appwrite/api";
import { INewTask, INewUser } from "../validation/types";
import { Models } from "appwrite";

export const useCreateAccount = () => {
  return useMutation({
    mutationKey: ["create-account"],
    mutationFn: (user: INewUser) => createAccount(user),
  });
};
export const useSigninAccount = () => {
  return useMutation({
    mutationKey: ["signin-account"],
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: deleteSession,
  });
};

export const useAddNewTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskDetails: INewTask) => addNewTask(taskDetails),
    onSuccess: (data) => {
      queryClient.setQueryData(["get-tasks"], (oldData: Models.Document) => {
        if (oldData && oldData.documents && Array.isArray(oldData.documents)) {
          return {
            ...oldData,
            documents: [...oldData.documents, data], // assuming data is the new task
          };
        }

        // If the structure is unexpected, log an error and return the old data
        console.error("Unexpected data structure:", oldData);
        return oldData;
      });
    },
  });
};

export const useGetRecentTasks = () => {
  return useQuery({
    queryKey: ["get-tasks"],
    queryFn: getRecentTasks,
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: INewTask }) =>
      updateTask(taskId, data),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
  });
};
