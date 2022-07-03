import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import BackButtonTransparent from "../components/BackButtonTransparent";
import ButtonPurple from "../components/ButtonPurple";
import Input from "../components/Input";
import { trpc } from "../utils/trpc";

const SignIn = () => {
  const signup = trpc.useMutation("user.signup", {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  const { back } = useRouter();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
        <h1 className="text-2xl text-light-accent font-bold">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-6">
          <label className="flex flex-col">
            Email
            <Input
              error={false}
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </label>
          <label className="flex flex-col">
            Username
            <Input
              error={false}
              name="name"
              onChange={handleChange}
              value={form.name}
            />
          </label>
          <label className="flex flex-col">
            Password
            <Input
              error={false}
              name="password"
              type={"password"}
              onChange={handleChange}
              value={form.password}
            />
          </label>
          <ButtonPurple type="submit">Sign in</ButtonPurple>
        </form>
        <p>
          Haven't got an account yet?{" "}
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
