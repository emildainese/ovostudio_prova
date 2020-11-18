export const initialState = {
  nome: "",
  cognome: "",
  citta: "",
  email: "",
  accepted: false,
  focused: {},
  message: "",
  error: null,
  loading: false,
  success: false,
  isValid: false,
  register: true,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
        isValid: action.isValid,
      };
    case "ACCEPT_SERVICE":
      return {
        ...state,
        accepted: action.accepted,
      };
    case "FOCUS":
      return {
        ...state,
        focused: {
          ...state.focused,
          [action.focused.field]: true,
        },
        isValid: action.isValid,
      };
    case "BLUR":
      return {
        ...state,
        focused: {
          ...state.focused,
          [action.focused.field]: false,
        },
        isValid: action.isValid,
      };
    case "TOGGLE_MODE":
      return {
        ...state,
        register: action.register,
      };
    case "LAODING_DATA":
      return {
        ...state,
        loading: action.loading,
      };
    case "SUBMIT_SUCCESS":
      console.log(action.message);
      return {
        ...state,
        success: action.success,
        message: action.message,
      };
    case "SUBMIT_FAIL":
      return {
        ...state,
        error: action.error,
      };
    case "CLEAR_FORM":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
