import { Account, Avatars, Client, Databases } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  tasksCollectionId: import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID,
};

const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const avatars = new Avatars(client);
