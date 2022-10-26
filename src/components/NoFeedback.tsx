import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LinkPurple } from "./ButtonPurple";

const NoFeedback = () => {
  return (
    <section className="py-16 md:py-28 bg-white rounded-lg flex flex-col items-center justify-center text-center">
      <section>
        <Image
          src={"/illustration-empty.svg"}
          alt="no feedback"
          width={130}
          height={136}
        />
      </section>
      <section className="flex flex-col gap-6">
        <h1 className="text-lg text-light-accent font-bold">
          There is no feedback yet
        </h1>
        <p className="text-sm text-dark-gray">
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <Link href="/add-feedback" passHref legacyBehavior>
          <LinkPurple className="w-fit mx-auto">+ Add Feedback</LinkPurple>
        </Link>
      </section>
    </section>
  );
};

export default NoFeedback;
