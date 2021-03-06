import InteractiveElement from "./InteractiveElement";
import type { Category } from "../../types/index";
import { useAtom } from "jotai";
import { cat } from "../constants";

const InteractiveSection = () => {
  const [active, setActive] = useAtom(cat);
  return (
    <section className="bg-white p-6 rounded-lg flex gap-x-2 gap-y-3 flex-wrap">
      {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map((i, idx) => (
        <InteractiveElement
          onClick={() => setActive(i as Category)}
          active={i === active ? true : false}
          key={idx}
        >
          {i}
        </InteractiveElement>
      ))}
    </section>
  );
};

export default InteractiveSection;
