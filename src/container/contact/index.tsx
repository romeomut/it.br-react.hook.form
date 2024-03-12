import { log } from "console";
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
  const {
    register,
    formState,
    handleSubmit,
    reset,
    resetField,
    setValue,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    trigger,
  } = useForm<FormType>({
    // mode: "onChange",
    mode: "onTouched",
    defaultValues: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(
          () =>
            resolve({
              [FIELD_KEY.MESSAGE]: "Message",
              [FIELD_KEY.NAME]: "Name",
            }),
          3000
        );
      });
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    // return console.log("data", data);
    return new Promise((resolve, rejects) => {
      setTimeout(() => resolve("test"), 5000);
    });
  };
  const onError: SubmitErrorHandler<FormType> = (errors) =>
    console.log("errors", errors);

  console.log(getFieldState(FIELD_KEY.MESSAGE, formState));

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

        {formState.isLoading && <span>Loading default values...</span>}

        {/* <button
          className="contact__button"
          onClick={() => {
            reset(
              {
                [FIELD_KEY.MESSAGE]: "Reset",
                [FIELD_KEY.NAME]: "Reset",
              },
              { keepDirtyValues: true }
            );
          }}
        >
          Reset
        </button> */}

        {/* <button
          className="contact__button"
          onClick={() => {
            resetField(FIELD_KEY.MESSAGE, { defaultValue: "new value" });
          }}
        >
          Reset
        </button> */}

        {/* <button
          type="button"
          className="contact__button"
          onClick={() => {
            setValue(FIELD_KEY.MESSAGE, "new value", { shouldValidate: true });
          }}
        >
          Reset
        </button> */}

        {/* <button
          type="button"
          className="contact__button"
          onClick={() => {
            setFocus(FIELD_KEY.MESSAGE, { shouldSelect: true });
          }}
        >
          Reset
        </button> */}

        {/* <button
          type="button"
          className="contact__button"
          onClick={() => {
            setError(
              FIELD_KEY.MESSAGE,
              {
                type: "CustommmmeeeeEror",
                message: "Test ERROR",
              },
              { shouldFocus: true }
            );
          }}
        >
          Reset
        </button> */}

        {/* <button
          type="button"
          className="contact__button"
          onClick={() => {
            clearErrors(FIELD_KEY.MESSAGE);
          }}
        >
          Reset
        </button> */}

        {/* <button
          type="button"
          className="contact__button"
          onClick={() => console.log(getValues(FIELD_KEY.MESSAGE))}
        >
          Reset
        </button> */}

        <button
          type="button"
          className="contact__button"
          onClick={async () => {
            const result = await trigger(FIELD_KEY.MESSAGE);
            console.log(result);
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}
