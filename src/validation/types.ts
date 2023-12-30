export type INewUser = {
  email: string;
  password: string;
  username: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type INewTask = {
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  important: boolean;
};
