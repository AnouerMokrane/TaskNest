import { INewTask, INewUser } from "../validation/types";
import { account, appwriteConfig, database } from "./appwriteConfig";
import { ID } from "appwrite";

export const createAccount = async (user: INewUser) => {
  try {
    const response = account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );
    if (!response) throw new Error();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const newSession = await account.createEmailSession(
      user.email,
      user.password
    );

    return newSession;
  } catch (error) {
    console.log(error);
  }
};

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );

    if (!newAccount) throw Error;

    return newAccount;
  } catch (error) {
    console.log(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    return currentAccount;
  } catch (error) {
    console.log("no user founded");
  }
};

export const deleteSession = async () => {
  try {
    const response = await account.deleteSession("current");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addNewTask = async (taskDetails: INewTask) => {
  const newTask = await database.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.tasksCollectionId,
    ID.unique(),
    {
      taskTiltle: taskDetails.title,
      taskText: taskDetails.description,
      date: taskDetails.date,
      completed: taskDetails.completed,
      important: taskDetails.important,
    }
  );
  if (!newTask) throw Error;

  return newTask;
};

export const getRecentTasks = async () => {
  const tasks = database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tasksCollectionId
  );

  if (!tasks) throw Error;

  return tasks;
};

export const deleteTask = async (taskId: string) => {
  try {
    await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      taskId
    );
    return { status: "ok" };
  } catch (error) {
    console.log("delete task failed");
  }
};

export const updateTask = async (taskId: string, data: INewTask) => {
  try {
    const updatedTask = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tasksCollectionId,
      taskId,
      {
        taskTiltle: data.title,
        taskText: data.description,
        date: data.date,
        completed: data.completed,
        important: data.important,
      }
    );

    if (!updatedTask) throw Error;
    return updatedTask;
  } catch (error) {
    console.log(error);
  }
};
