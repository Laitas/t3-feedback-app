import React, { useState } from "react";
import ButtonPurple from "./ButtonPurple";
import TextArea from "./TextArea";

const Reply = () => {
  const [value, setValue] = useState("");
  return (
    <section className="flex flex-col sm:flex-row mb-4">
      <TextArea
        onChange={(e) => setValue(e.target.value)}
        value={value}
        error={false}
        className="w-full"
        placeholder="Type your comment here"
      />
      <div className="sm:ml-4">
        <ButtonPurple className="whitespace-nowrap w-full">
          Post Reply
        </ButtonPurple>
      </div>
    </section>
  );
};

export default Reply;
