import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import BackButtonTransparent from "../components/BackButtonTransparent";
import ButtonPurple from "../components/ButtonPurple";
import Input from "../components/Input";
import { trpc } from "../utils/trpc";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type IFormInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  const checkCredentials = trpc.useMutation("user.checkCredentials", {
    onSuccess: async (data) =>
      await signIn("credentials", { ...data, callbackUrl: "/" }),
    onError: (error) => setError(error.message),
  });
  const { back } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    checkCredentials.mutateAsync(data);
  };
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <main className="p-12 rounded-lg bg-white max-w-sm mx-auto relative">
        <BackButtonTransparent
          onClick={back}
          className="absolute -top-16 left-0"
        />
        <h1 className="text-2xl text-light-accent font-bold">Sign in</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 my-6"
        >
          <label className="flex flex-col">
            Email
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} error={errors.email?.type === "required"} />
              )}
            />
          </label>
          <label className="flex flex-col">
            Password
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  error={
                    errors.password?.type === "required" ||
                    errors.password?.type === "minLength"
                  }
                  errorText={errors.password?.message}
                />
              )}
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <ButtonPurple type="submit">Sign in</ButtonPurple>
        </form>
        <p>
          {`Haven't got an account yet?`}{" "}
          <span className="text-blue-1 hover:text-blue-2 transition-colors">
            <Link href="/signup">Sign up</Link>
          </span>
        </p>
        <p>
          Forgot password? <span>Too bad lol</span>
        </p>
      </main>
    </div>
  );
};

export default SignIn;
