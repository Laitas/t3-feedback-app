import React, { useState } from "react";
import ButtonPurple from "./ButtonPurple";
import TextArea from "./TextArea";

const AddComment = () => {
  const [value, setValue] = useState("");
  return (
    <section className="bg-white py-6 px-9">
      <h2 className="font-bold text-light-accent text-lg pb-7">Add Comment</h2>
      <div className="">
        <TextArea
          onChange={(e) => setValue(e.target.value)}
          value={value}
          error={false}
          className="w-full"
          placeholder="Type your comment here"
        />
        <div className="flex justify-end mt-4">
          <ButtonPurple>Post Comment</ButtonPurple>
        </div>
      </div>
    </section>
  );
};

export default AddComment;
