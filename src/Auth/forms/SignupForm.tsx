import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useCreateAccount } from "../../react-query/queriesAndMutations";
import toast from "react-hot-toast";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createAccount, isPending } = useCreateAccount();

  const onSubmit = async (data: FormValues) => {
    try {
      const newUser = await createAccount(data);
      if (newUser) {
        reset();
        toast.success("Account created successfully!");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 max-w-xl w-[350px] md:w-[445px] p-6 md:p-14  bg-gray-950 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className=" text-sm" htmlFor="username">
            Username
          </label>
          <input
            className=" bg-[#252527] p-2 rounded-sm max-[400px]:w-[300px]"
            type="text"
            {...register("username", { required: "This field is required" })}
          />
          <p className=" text-red-500 text-xs mt-1">
            {errors.username?.message}{" "}
          </p>
        </div>
        <div>
          <label className=" text-sm" htmlFor="email">
            Email
          </label>
          <input
            className=" bg-[#252527] p-2 rounded-sm max-[400px]:w-[300px]"
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
          {isPending ? "Loading..." : "Sign up"}
        </button>
        <p className=" text-xs">
          Already have an account? <Link to={"/sign-in"}>Sign in</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default SignupForm;
