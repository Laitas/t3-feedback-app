import { useSession } from "next-auth/react";
import Link from "next/link";
import { LinkPurple } from "./ButtonPurple";
import InteractiveSection from "./InteractiveSection";
import Roadmap from "./Roadmap";

const SideNav = ({ open }: { open: boolean }) => {
  const { status } = useSession();

  return (
    <div
      className={`${
        !open && "invisible"
      } sm:hidden inset-0 overflow-hidden bg-black bg-opacity-50 absolute z-10 flex justify-end mt-24`}
    >
      <nav
        className={`flex flex-col gap-6 p-6 bg-gray-1 max-w-[16rem] transition-all ${
          !open ? "translate-x-full" : ""
        }`}
      >
        {status === "unauthenticated" && (
          <Link href="/signin" passHref>
            <LinkPurple>Sign in</LinkPurple>
          </Link>
        )}
        <InteractiveSection />
        <Roadmap />
      </nav>
    </div>
  );
};

export default SideNav;
