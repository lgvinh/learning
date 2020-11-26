export default function  cartReducer(state = [], action = {}) {
  switch (action.type) {
    case "ADDCART": {
      const product = action.payload;
      let cart = state;
      // Filter always return an array
      const existingProduct = cart.filter(p => p.id === product.id && p.size === product.size);
      if ( existingProduct.length === 0 ) {
        cart = [...cart, product];
      } else {
        const withoutExistingProduct = cart.filter(p => p.id !== product.id || p.size !== product.size),
              updatingQuantityProduct = {
                ...existingProduct[0],
                quantity: Number(existingProduct[0].quantity) + Number(product.quantity)
              };
       cart = [...withoutExistingProduct, updatingQuantityProduct];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
    case "REMOVEITEM": {
      const product = action.payload;
      let cart = state;
      const withoutExistingProduct = cart.filter(p => p.id !== product.id || p.size !== product.size );
      cart = [...withoutExistingProduct];
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
    case "LOADCART":
      const cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    case "INCREASEQUAN": {
      const findIndexCart = state.findIndex(item => item.id === action.payload.id && item.size === action.payload.size);
      if (state[findIndexCart].quantity < 50)
        state[findIndexCart].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    }
    case "DECREASEQUAN": {
      const findIndexCart = state.findIndex(item => item.id === action.payload.id && item.size === action.payload.size);
      if (state[findIndexCart].quantity > 1)
        state[findIndexCart].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
    }
    case "CLEARCART": {
      localStorage.removeItem("cart");
      return [];
    }
    default:
      return state;
  }
}