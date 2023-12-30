import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSigninAccount } from "../../react-query/queriesAndMutations";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { checkAuthUser } = useAuthContext();

  const navigate = useNavigate();

  const { mutateAsync: signIn, isPending } = useSigninAccount();

  const onSubmit = async (data: FormValues) => {
    await signIn(data);

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      await toast.success("Welcome back! You have successfully logged in.");
      navigate("/");
    } else {
      toast.error(
        '"Login failed. Please check your credentials and try again."'
      );
    }
  };
  return (
    <div>
      <form
        className="flex flex-col gap-6 max-w-xl w-[350px] md:w-[445px] p-6 md:p-14  bg-gray-950 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <label className=" text-sm" htmlFor="email">
            Email
          </label>
          <input
            className=" bg-[#252527] p-2 rounded-sm  max-[400px]:w-[300px]"
            type="text"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email",
              },
            })}
          />
          <p className=" text-red-500 text-xs mt-1">{errors.email?.message} </p>
        </div>
        <div>
          <label className=" text-sm" htmlFor="password">
            Password
          </label>
          <input
            className=" bg-[#252527] p-2 rounded-sd max-[400px]:w-[300px]"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <p className=" text-red-500 text-xs mt-1">
            {errors.password?.message}{" "}
          </p>
        </div>
        <button className=" bg-purple-950 p-2 text-sm rounded-sm max-[400px]:w-[300px]">
          {isPending ? "Loading..." : "Sign in"}
        </button>
        <p className=" text-xs">
          Don't have an account? <Link to={"/sign-up"}>Sign up</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
