export default function signinReducer(state = {}, action = {}) {
  switch (action.type) {
    case "SIGNIN":
      return action.payload ? action.payload : {};
    case "SIGNOUT":
      return {};
    default:
      return state;
  }
}