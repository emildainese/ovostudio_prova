import React from "react";
import { initialState } from "../reducers/formReducer";
import { formReducer } from "../reducers/formReducer";
import { validate } from "../util/validators";

export const useForm = (buttonRef) => {
  const [state, dispatch] = React.useReducer(formReducer, initialState);
  const { nome, cognome, citta, email, accepted, register } = state;

  const setAccepted = (accept) => {
    dispatch({ type: "ACCEPT_SERVICE", accepted: accept });
  };

  const inputHandler = (e) => {
    dispatch({
      type: "INPUT_CHANGE",
      field: e.target.name,
      value: e.target.value,
      isValid: validate(e.target.name, e.target.value),
    });
  };

  const focusHandler = (e) => {
    dispatch({
      type: "FOCUS",
      focused: { field: e.target.name },
      isValid: validate(e.target.name, e.target.value),
    });
  };

  const blurHandler = (e) => {
    dispatch({
      type: "BLUR",
      focused: { field: e.target.name },
      isValid: validate(e.target.name, e.target.value),
    });
  };

  const toggleModeHandler = () => {
    dispatch({ type: "TOGGLE_MODE", register: !register });
  };

  const isValidForm = () => {
    if (!register) {
      return validate("email", email);
    }
    return (
      validate("email", email) &&
      validate("nome", nome) &&
      validate("citta", citta) &&
      validate("cognome", cognome) &&
      accepted
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LAODING_DATA", loading: true });
      let res;
      if (register) {
        res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            cognome,
            citta,
            email,
            accettato: accepted,
          }),
        });
      } else {
        res = await fetch("/api/discountCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
      }
      const data = await res.json();
      dispatch({ type: "LAODING_DATA", loading: false });
      if (data.error) throw data.error;
      if (register) {
        const btnTimer = setTimeout(() => {
          buttonRef.current.click();
          clearTimeout(btnTimer);
        }, 2000);
        dispatch({
          type: "SUBMIT_SUCCESS",
          success: true,
          message: data.message,
        });
        const successTimer = setTimeout(() => {
          dispatch({
            type: "SUBMIT_SUCCESS",
            success: false,
            message: data.message,
          });
          clearTimeout(successTimer);
        }, 2000);
      } else {
        dispatch({ type: "CLEAR_FORM" });
      }
    } catch (err) {
      dispatch({ type: "LAODING_DATA", loading: false });
      dispatch({ type: "SUBMIT_FAIL", error: err });
      const errorTimer = setTimeout(() => {
        dispatch({ type: "SUBMIT_FAIL", error: null });
        clearTimeout(errorTimer);
      }, 2000);
    }
  };

  return {
    state,
    setAccepted,
    inputHandler,
    focusHandler,
    blurHandler,
    isValidForm,
    submitHandler,
    toggleModeHandler,
  };
};
