import React, { useState } from "react";
import InteractiveElement from "./InteractiveElement";

const InteractiveSection = () => {
  const [active, setActive] = useState("All");
  return (
    <section className="bg-white p-6 rounded-lg flex gap-x-2 gap-y-3 flex-wrap">
      {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map((i, idx) => (
        <InteractiveElement
          onClick={() => setActive(i)}
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
