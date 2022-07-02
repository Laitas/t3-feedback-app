import { HiChevronUp } from "react-icons/hi";

interface Types {
  active?: boolean;
  upvotes: number;
}

const UpvoteButton = ({ active = false, upvotes }: Types) => {
  return (
    <button
      className={`flex sm:flex-col items-center text-sm font-semibold rounded-lg py-1 px-4 hover:bg-[#CFD7FF] transition-all ${
        active ? "bg-blue-1 text-white" : "bg-gray-1 text-light-accent"
      }`}
    >
      <HiChevronUp className="mr-2 sm:mr-0" />
      {upvotes}
    </button>
  );
};

export default UpvoteButton;
