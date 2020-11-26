export function signinAction(payload) {
  return {
    type: "SIGNIN",
    payload
  } 
}

export function signoutAction() {
  return {
    type: "SIGNOUT"
  } 
}