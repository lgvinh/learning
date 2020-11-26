export default function signinReducer(state = {}, action = {}) {
  switch (action.type) {
    case "SIGNIN_ASYNC":
      return action.payload ? action.payload : {};
    case "SIGNOUT":
      return {};
    default:
      return state;
  }
}