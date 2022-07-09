import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BackButtonTransparent from "../../../components/BackButtonTransparent";
import ButtonDark from "../../../components/ButtonDark";
import ButtonPurple from "../../../components/ButtonPurple";
import ButtonRed from "../../../components/ButtonRed";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import { trpc } from "../../../utils/trpc";
import { Category } from "../../../../types";

interface Inputs {
  title: string;
  category: string;
  desc: string;
}

const Edit = () => {
  const { query, back, push } = useRouter();
  const id = query.id as string;
  const { data } = trpc.useQuery(["posts.byId", { id }], {
    enabled: id !== undefined,
  });
  const updatePost = trpc.useMutation(["posts.edit"], {
    onSuccess: () => push("/post/" + id),
  });
  const { data: session } = useSession();
  const [category, setCategory] = useState<Category>("Feature");
  const [errors, setErrors] = useState({
    title: false,
    desc: false,
  });
  const [form, setForm] = useState({
    title: "",
    desc: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updatePost.mutate({
      category,
      id,
      userId: session?.user.id,
      title: form.title,
      desc: form.desc,
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (data) {
      setCategory(data.category as Category);
      setForm({ title: data.title, desc: data.desc });
    }
  }, [data]);

  if (!data) return <h1>Loading</h1>;
  if (data.userId !== session?.user.id) return <h1>fakof</h1>;
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
        <h1 className="text-2xl text-light-accent font-bold">Edit Feedback</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-6">
          <label className="flex flex-col">
            <p className="text-sm font-bold text-light-accent">
              Feedback title
            </p>
            <p className="text-sm text-dark-gray mb-4">
              Add a short, descriptive headline
            </p>
            <Input
              name="title"
              onChange={handleChange}
              value={form.title}
              error={errors.title}
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
              name="desc"
              onChange={handleChange}
              value={form.desc}
              error={errors.desc}
            />
          </label>
          <section className="flex flex-col gap-4">
            <ButtonPurple type="submit">Save Changes</ButtonPurple>
            <ButtonDark onClick={back}>Cancel</ButtonDark>
            <ButtonRed>Delete</ButtonRed>
          </section>
        </form>
      </main>
    </div>
  );
};

export default Edit;
