import { Dispatch, SetStateAction } from "react";

interface Types {
  form: {
    title: string;
    desc: string;
  };
  errorText: {
    title: string;
    desc: string;
  };
  setErrorText: Dispatch<SetStateAction<{ title: string; desc: string }>>;
  setErrors: Dispatch<SetStateAction<{ title: boolean; desc: boolean }>>;
}
const useAddFeedbackValidation = ({
  form,
  setErrorText,
  errorText,
  setErrors,
}: Types) => {
  const validations = () => {
    let err = { title: false, desc: false };
    if (!form.title || form.title.length < 10) {
      err.title = true;
      setErrorText({
        ...errorText,
        title: "Title can't be less than 10 characters",
      });
    }
    if (!form.desc || form.desc.length < 10) {
      err.desc = true;
      setErrorText({
        ...errorText,
        desc: "Title can't be less than 10 characters",
      });
    }
    setErrors(err);
    return Object.values(err).every((val) => val !== true);
  };
  return { validations };
};

export default useAddFeedbackValidation;
