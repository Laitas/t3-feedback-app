import React, { ChangeEvent } from "react";

interface Types {
  placeholder?: string;
  type?: "text" | "password" | "email";
  error: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errorText?: string;
  ref: any;
}

// const Input = ({
//   type = "text",
//   placeholder,
//   error,
//   onChange,
//   value,
//   name,
//   errorText,
//   ref,
// }: Types) => {
//   return (
//     <>
//       <input
//         ref={ref}
//         name={name}
//         onChange={onChange}
//         value={value}
//         type={type}
//         placeholder={placeholder}
//         className={`bg-[#F7F8FD] text-dark-accent py-3 px-6 rounded-md active:outline-blue-1 outline-blue-1 ${
//           error && "border border-red-1"
//         }`}
//       />
//       {error && (
//         <p className="text-sm text-red-1 mt-1">
//           {errorText ? errorText : `Can't be empty`}
//         </p>
//       )}
//     </>
//   );
// };

// export default Input;

const Input = React.forwardRef<HTMLInputElement, Types>(
  (
    { type = "text", placeholder, error, onChange, value, name, errorText },
    ref
  ) => {
    return (
      <>
        <input
          ref={ref}
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          className={`bg-[#F7F8FD] text-dark-accent py-3 px-6 rounded-md active:outline-blue-1 outline-blue-1 ${
            error && "border border-red-1"
          }`}
        />
        {error && (
          <p className="text-sm text-red-1 mt-1">
            {errorText ? errorText : `Can't be empty`}
          </p>
        )}
      </>
    );
  }
);
Input.displayName = "PurpleLink";

export default Input;
