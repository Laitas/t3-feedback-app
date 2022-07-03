import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Category } from "../../types";
import BackButtonTransparent from "../components/BackButtonTransparent";
import ButtonDark from "../components/ButtonDark";
import ButtonPurple from "../components/ButtonPurple";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import { trpc } from "../utils/trpc";

const AddFeedback = () => {
  const post = trpc.useMutation("posts.new", {
    onSuccess: async (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  const { back } = useRouter();
  const { data: session } = useSession();
  const [category, setCategory] = useState<Category>("Feature");
  const [form, setForm] = useState({
    title: "",
    desc: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (session) {
      post.mutate({ ...form, category, userId: session.user.id });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <main className="p-12 rounded-lg bg-white max-w-sm md:max-w-xl w-full mx-auto relative">
        <BackButtonTransparent
          onClick={back}
          className="absolute -top-16 left-0"
        />
        <div className="oval w-14 h-14 rounded-full text-white font-semibold flex flex-col justify-center items-center text-4xl absolute top-0 -translate-y-1/2">
          +
        </div>
        <h1 className="text-2xl text-light-accent font-bold">
          Create New Feedback
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-6">
          <label className="flex flex-col">
            <p className="text-sm font-bold text-light-accent">
              Feedback title
            </p>
            <p className="text-sm text-dark-gray mb-4">
              Add a short, descriptive headline
            </p>
            <Input
              error={false}
              name="title"
              onChange={handleChange}
              value={form.title}
            />
          </label>
          <section className="flex flex-col relative">
            <p className="text-sm font-bold text-light-accent">Category</p>
            <p className="text-sm text-dark-gray mb-4">
              Choose a category for your feedback
            </p>
            <Dropdown
              category={category}
              setCategory={setCategory}
              className="top-28 w-full"
            />
          </section>
          <label className="flex flex-col">
            <p className="text-sm font-bold text-light-accent">
              Feedback description
            </p>
            <p className="text-sm text-dark-gray mb-4">
              Include any specific comments on what should be improved added,
              etc.
            </p>
            <Input
              error={false}
              name="desc"
              onChange={handleChange}
              value={form.desc}
            />
          </label>
          <section className="flex gap-4 justify-end">
            <ButtonDark onClick={back}>Cancel</ButtonDark>
            <ButtonPurple type="submit">Add feedback</ButtonPurple>
          </section>
        </form>
      </main>
    </div>
  );
};

export default AddFeedback;
