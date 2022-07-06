import { ChangeEvent } from "react";

interface Types {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error: boolean;
  className?: string;
  placeholder?: string;
}
const TextArea = ({
  onChange,
  value,
  error,
  className,
  placeholder,
}: Types) => {
  return (
    <section className="w-full">
      <>
        <textarea
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={`${className} bg-[#F7F8FD] text-dark-accent py-3 px-6 rounded-md active:outline-blue-1 outline-blue-1 ${
            error && "border border-red-1"
          }`}
        />
        {error && (
          <p className="text-sm text-red-1 mt-1">Can&apos;t be empty</p>
        )}
      </>
    </section>
  );
};

export default TextArea;
