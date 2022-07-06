import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import BackButtonTransparent from "../components/BackButtonTransparent";
import ButtonPurple from "../components/ButtonPurple";
import Input from "../components/Input";
import useSignUpValidation from "../hooks/validations/useSignUpValidation";
import { trpc } from "../utils/trpc";

const initialValues = {
  email: "",
  name: "",
  username: "",
  password: "",
};

const SignUp = () => {
  const [errors, setErrors] = useState({
    password: false,
    email: false,
    name: false,
    username: false,
  });
  const [errorText, setErrorText] = useState(initialValues);
  const signup = trpc.useMutation("user.signup", {
    onSuccess: async (data) =>
      await signIn("credentials", { ...data, callbackUrl: "/" }),
    onError: (error) => console.log(error),
  });
  const { back } = useRouter();
  const [form, setForm] = useState({ ...initialValues, repeat_password: "" });
  const { validations } = useSignUpValidation({
    form,
    setErrorText,
    errorText,
    setErrors,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validations()) return;
    signup.mutate(form);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <main className="p-12 rounded-lg bg-white max-w-sm mx-auto relative">
        <BackButtonTransparent
          onClick={back}
          className="absolute -top-16 left-0"
        />
        <h1 className="text-2xl text-light-accent font-bold">Sign up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-6">
          <label className="flex flex-col">
            Email
            <Input
              error={errors.email}
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </label>
          <label className="flex flex-col">
            Username
            <Input
              error={errors.username}
              name="username"
              onChange={handleChange}
              value={form.username}
              errorText={errorText.username}
            />
          </label>
          <label className="flex flex-col">
            Name
            <Input
              error={errors.name}
              name="name"
              onChange={handleChange}
              value={form.name}
            />
          </label>
          <label className="flex flex-col">
            Password
            <Input
              name="password"
              type={"password"}
              onChange={handleChange}
              value={form.password}
              error={errors.password}
              errorText={errorText.password}
            />
          </label>
          <label className="flex flex-col">
            Repeat password
            <Input
              name="repeat_password"
              type={"password"}
              onChange={handleChange}
              value={form.repeat_password}
              error={errors.password}
              errorText={errorText.password}
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
