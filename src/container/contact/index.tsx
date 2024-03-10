import "./index.css";

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

enum FIELD_KEY {
  MESSAGE = "message",
  NAME = "name",
}

interface FormType {
  [FIELD_KEY.MESSAGE]: string;
  [FIELD_KEY.NAME]: string;
}

// const validateRequired = (value: any) =>
//   value.length === 0 ? "Поле не може бути пустим" : null;

export default function Container() {
  const { register, formState, handleSubmit, reset } = useForm<FormType>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    // return console.log("data", data);
    return new Promise((resolve, rejects) => {
      setTimeout(() => resolve("test"), 5000);
    });
  };
  const onError: SubmitErrorHandler<FormType> = (errors) =>
    console.log("errors", errors);

  return (
    <div className="contact">
      <div className="contact__title">Contact form</div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="contact__form"
      >
        <input
          placeholder="Your message"
          className="contact__input"
          //   {...register(FIELD_KEY.MESSAGE, { required: true })}
          {...register(FIELD_KEY.MESSAGE, {
            validate: {
              require: (value) =>
                value.length === 0 ? "Поле не може бути пустим" : (null as any),
              inNumber: (value) =>
                isNaN(Number(value))
                  ? "Поле має не числове значення"
                  : (null as any),
            },
          })}
        />

        {formState.errors[FIELD_KEY.MESSAGE] && (
          <span className="error">
            {formState.errors[FIELD_KEY.MESSAGE].message}
          </span>
        )}

        <input
          placeholder="Your name"
          className="contact__input"
          //   {...register(FIELD_KEY.NAME, { required: true })}
          {...register(FIELD_KEY.NAME, {
            validate: {
              require: (value) =>
                value.length === 0 ? "Поле не може бути пустим" : (null as any),
              inNumber: (value) =>
                isNaN(Number(value))
                  ? "Поле має не числове значення"
                  : (null as any),
            },
          })}
        />

        {formState.errors[FIELD_KEY.NAME] && (
          <span className="error">
            {formState.errors[FIELD_KEY.NAME].message}
          </span>
        )}

        <button
          disabled={
            formState.isValid !== true || formState.isSubmitting === true
          }
          className="contact__button"
          type="submit"
        >
          Submit
        </button>

        {formState.isSubmitting && <span>Loading...</span>}
        <span>Submit count: {formState.submitCount}</span>
      </form>
    </div>
  );
}
