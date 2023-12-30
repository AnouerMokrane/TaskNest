import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import CopmetedTasks from "./pages/CopmetedTasks";
import IncompletedTasks from "./pages/IncompletedTasks";
import SigninForm from "./Auth/forms/SigninForm";
import SignupForm from "./Auth/forms/SignupForm";
import AuthLayout from "./Auth/AuthLayout";
import PrivatePages from "./pages/PrivatePages";
import { AuthContextProvider } from "./context/AuthContext";
import QueryProvider from "./react-query/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <QueryProvider>
        <main className="relative h-screen flex gap-4 md:gap-6 py-8 px-4 md:px-8 bg-[#181818] text-white">
          <Outlet />
        </main>
        <ReactQueryDevtools />
      </QueryProvider>
    </AuthContextProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<PrivatePages />}>
        <Route path="/" element={<AllTasks />} />
        <Route path="/completed" element={<CopmetedTasks />} />
        <Route path="/incompleted" element={<IncompletedTasks />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
