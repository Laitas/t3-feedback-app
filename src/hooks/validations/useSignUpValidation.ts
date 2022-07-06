import { Dispatch, SetStateAction } from "react";

interface Types {
  form: { [key: string]: string };
  setErrorText: Dispatch<
    SetStateAction<{
      email: string;
      name: string;
      username: string;
      password: string;
    }>
  >;
  errorText: {
    email: string;
    name: string;
    username: string;
    password: string;
  };
  setErrors: Dispatch<
    SetStateAction<{
      password: boolean;
      email: boolean;
      name: boolean;
      username: boolean;
    }>
  >;
}
const useSignUpValidation = ({
  form,
  setErrorText,
  errorText,
  setErrors,
}: Types) => {
  const validations = () => {
    let err = { password: false, email: false, name: false, username: false };
    if (form.password !== form.repeat_password) {
      err.password = true;
      setErrorText({
        ...errorText,
        password: "Passwords don't match",
      });
    }
    if (!form.password || !form.repeat_password) {
      err.password = true;
    }
    if (
      form.password &&
      form.repeat_password &&
      (form.password || form.repeat_password).length < 6
    ) {
      err.password = true;
      setErrorText({
        ...errorText,
        password: "Password needs to be at least 6 characters long",
      });
    }
    if (!form.username || form.username.length < 3) {
      err.username = true;
      setErrorText({
        ...errorText,
        username: "Username must be at least 3 characters long",
      });
    }
    if (!form.email) {
      err.email = true;
    }
    if (!form.name) {
      err.name = true;
    }
    setErrors(err);
    return Object.values(err).every((val) => val !== true);
  };
  return { validations };
};

export default useSignUpValidation;
