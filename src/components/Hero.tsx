import Hamburger from "hamburger-react";
import { useState } from "react";
import SideNav from "./SideNav";

const Hero = ({ className = "" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        className={`${className} p-6 hero flex justify-between sm:flex-col sm:justify-end sm:rounded-lg lg:h-36`}
      >
        <div>
          <h1 className="sm:text-xl font-bold text-white">T3 Fapp</h1>
          <p className="text-white">Feedback Board</p>
        </div>
        <div className="sm:hidden">
          <Hamburger
            color="white"
            label="show menu"
            toggled={open}
            toggle={setOpen}
          />
        </div>
      </section>
      <SideNav open={open} />
    </>
  );
};

export default Hero;
