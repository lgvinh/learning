export function addToCartAction(payload) {
  return {
    type: "ADDCART",
    payload
  }
}

export function removeCartItemAction(payload) {
  return {
    type: "REMOVEITEM",
    payload
  }
}

export function loadCartAction(payload) {
  return {
    type: "LOADCART",
    payload
  }
}

export function increaseQuan(payload) {
  return {
    type: "INCREASEQUAN",
    payload
  }
}

export function decreaseQuan(payload) {
  return {
    type: "DECREASEQUAN",
    payload
  }
}

export function clearCart() {
  return {
    type: "CLEARCART"
  }
}