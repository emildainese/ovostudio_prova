import React, { Fragment } from "react";
import { useForm } from "../hooks/form";
import Alert from "./Alert";
import Spinner from "./Spinner";

const Form = () => {
  const buttonRef = React.useRef(null);
  const {
    state,
    submitHandler,
    blurHandler,
    focusHandler,
    inputHandler,
    setAccepted,
    isValidForm,
    toggleModeHandler,
  } = useForm(buttonRef);

  const {
    nome,
    cognome,
    citta,
    email,
    accepted,
    isValid,
    focused,
    register,
    loading,
    error,
    success,
    message,
  } = state;

  return (
    <form onSubmit={submitHandler} className="mt-5">
      {loading && <Spinner />}
      {error && <Alert type="danger" message={error} />}
      {success && <Alert type="success" message={message} />}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          className="form-control"
          onBlur={blurHandler}
          onFocus={focusHandler}
          onChange={inputHandler}
        />
        {!isValid && focused["email"] && (
          <small className="form-text text-danger">Email invalida</small>
        )}
      </div>
      {register && (
        <CuponForm
          nome={nome}
          cognome={cognome}
          citta={citta}
          accepted={accepted}
          isValid={isValid}
          focused={focused}
          setAccepted={setAccepted}
          blurHandler={blurHandler}
          focusHandler={focusHandler}
          inputHandler={inputHandler}
        />
      )}
      {!register && (
        <Fragment>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={!isValidForm()}
          >
            Ottieni lo sconto
          </button>
          <small className="d-block my-2 text-muted">Non sei registrato?</small>
          <button className="btn btn-warning" onClick={toggleModeHandler}>
            Registrazione
          </button>
        </Fragment>
      )}
      {register && (
        <Fragment>
          <button
            type="submit"
            className="btn btn-success btn-block"
            disabled={!isValidForm()}
          >
            Registrazione
          </button>
          <small className="d-block my-2 text-muted">Gia registrato?</small>
          <button
            className="btn btn-warning"
            onClick={toggleModeHandler}
            ref={buttonRef}
          >
            Ottieni il buono
          </button>
        </Fragment>
      )}
    </form>
  );
};

const CuponForm = ({
  nome,
  cognome,
  citta,
  accepted,
  blurHandler,
  focusHandler,
  inputHandler,
  isValid,
  focused,
  setAccepted,
}) => {
  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          name="nome"
          value={nome}
          className="form-control"
          onBlur={blurHandler}
          onFocus={focusHandler}
          onChange={inputHandler}
        />
        {!isValid && focused["nome"] && (
          <small className="form-text text-danger">
            Nome invalido: sono permessi da 3 - 30 caratteri
          </small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="cognome">Cognome</label>
        <input
          type="text"
          name="cognome"
          value={cognome}
          className="form-control"
          onBlur={blurHandler}
          onFocus={focusHandler}
          onChange={inputHandler}
        />
        {!isValid && focused["cognome"] && (
          <small className="form-text text-danger">
            Cognome invalido: sono permessi da 3 - 30 caratteri
          </small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="citta">Citta</label>
        <input
          type="text"
          name="citta"
          value={citta}
          className="form-control"
          onBlur={blurHandler}
          onFocus={focusHandler}
          onChange={inputHandler}
        />
        {!isValid && focused["citta"] && (
          <small className="form-text text-danger">Citta invalida</small>
        )}
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          value={accepted}
          checked={!!accepted}
          onChange={() => setAccepted(!accepted)}
        />
        <label className="form-check-label" htmlFor="terminiServizio">
          Accetta i termini di servizio
        </label>
      </div>
    </Fragment>
  );
};

export default Form;
