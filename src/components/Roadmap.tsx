import Link from "next/link";

const Roadmap = () => {
  return (
    <section className="bg-white p-6 rounded-lg flex flex-col md:h-56 lg:h-64">
      <section className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Roadmap</h2>
        <Link href="/roadmap">
          <a className="text-blue-1 underline">View</a>
        </Link>
      </section>
      <ul className="text-dark-gray list-disc ml-6">
        <li className="marker:text-[#F49F85]">
          <span className="flex justify-between">
            Planned <span className="font-bold">2</span>
          </span>
        </li>
        <li className="marker:text-purple-1">
          <span className="flex justify-between">
            In-Progress <span className="font-bold">3</span>
          </span>
        </li>
        <li className="marker:text-light-blue">
          <span className="flex justify-between">
            Live <span className="font-bold">11</span>
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Roadmap;
