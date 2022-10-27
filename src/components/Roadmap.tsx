import { trpc } from "../utils/trpc";

const Roadmap = () => {
  const { data } = trpc.useQuery(["posts.roadmap"]);

  return (
    <section className="bg-white p-6 rounded-lg flex flex-col">
      <section className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Roadmap</h2>
      </section>
      <ul className="text-dark-gray list-disc ml-6">
        <li className="marker:text-[#F49F85]">
          <span className="flex justify-between">
            Planned{" "}
            <span className="font-bold">{data ? data.planned : "..."}</span>
          </span>
        </li>
        <li className="marker:text-purple-1">
          <span className="flex justify-between">
            In-Progress{" "}
            <span className="font-bold">{data ? data.inProgress : "..."}</span>
          </span>
        </li>
        <li className="marker:text-light-blue">
          <span className="flex justify-between">
            Live <span className="font-bold">{data ? data.live : "..."}</span>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Roadmap;
