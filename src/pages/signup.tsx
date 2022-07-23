import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import BackButtonTransparent from "../components/BackButtonTransparent";
import ButtonPurple from "../components/ButtonPurple";
import Input from "../components/Input";
import { trpc } from "../utils/trpc";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type IFormInput = {
  email: string;
  name: string;
  username: string;
  password: string;
  repeat_password: string;
};

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signup.mutateAsync(data);
  };
  const signup = trpc.useMutation("user.signup", {
    onSuccess: async (data) =>
      await signIn("credentials", { ...data, callbackUrl: "/" }),
    onError: (error) => console.log(error),
  });
  const { back } = useRouter();

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <main className="p-12 rounded-lg bg-white max-w-sm mx-auto relative">
        <BackButtonTransparent
          onClick={back}
          className="absolute -top-16 left-0"
        />
        <h1 className="text-2xl text-light-accent font-bold">Sign up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 my-6"
        >
          <label className="flex flex-col">
            Email
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} error={errors.email?.type === "required"} />
              )}
            />
          </label>
          <label className="flex flex-col">
            Username
            <Controller
              name="username"
              control={control}
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  error={
                    errors.username?.type === "minLength" ||
                    errors.username?.type === "required"
                  }
                  errorText="Can't be shorter than 3 characters"
                />
              )}
            />
          </label>
          <label className="flex flex-col">
            Name
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  error={
                    errors.name?.type === "minLength" ||
                    errors.name?.type === "required"
                  }
                  errorText="Can't be shorter than 3 characters"
                />
              )}
            />
          </label>
          <label className="flex flex-col">
            Password
            <Controller
              name="password"
              control={control}
              rules={{ required: "Can't be shorter than 6 characters" }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  error={
                    errors.password?.type === "minLength" ||
                    errors.repeat_password?.type === "validate" ||
                    errors.password?.type === "required"
                  }
                  errorText={errors.repeat_password?.message}
                />
              )}
            />
          </label>
          <label className="flex flex-col">
            Repeat password
            <Controller
              name="repeat_password"
              control={control}
              rules={{
                required: "Can't be shorter than 6 characters",
                validate: (val) =>
                  val === watch("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  error={
                    errors.repeat_password?.type === "minLength" ||
                    errors.repeat_password?.type === "validate" ||
                    errors.repeat_password?.type === "required"
                  }
                  errorText={errors.repeat_password?.message}
                />
              )}
            />
          </label>
          <ButtonPurple type="submit">Sign in</ButtonPurple>
        </form>
        <p>
          Already have an account?{" "}
          <span className="text-blue-1 hover:text-blue-2 transition-colors">
            <Link href="/signin">Sign in</Link>
          </span>
        </p>
      </main>
    </div>
  );
};

export default SignUp;
