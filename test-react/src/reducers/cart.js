const cart = (state = [], action) => {
  switch (action.type) {
    case 'addCart':
      state.push(action.payload);
      return state;
    default:
      return state;
  }
}

export default cart