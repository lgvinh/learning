// Regexp
let emailVal = (/^[a-z((\w|\.)?)A-Z0-9]{4,}(\@)[a-z]+((\.[a-z]{2,})+)$/),
    passVal = (/^[a-zA-Z0-9]{6,}$/),
    phoneVal = (/^0[0-9]{9,11}$/);

let validateSignUp = (req, res, next) => {
  const { email, phone, password } = req.body;
  let error = "";

  if ( !emailVal.test(email) ) {
    error += "Email";
  }
  if ( !phoneVal.test(phone) ) {
    if ( error.length > 0 ) {
      error += ", phone number";
    } else {
      error += "Phone number";
    }
  }
  if ( !passVal.test(password) ) {
    if ( error.length > 0 ) {
      error += ", password";
    } else {
      error += "Password";
    }
  }
  if ( error.length > 0 ) {
    error += " invalid";
    res.json({
      status: 400,
      message: error
    });
  } else {
    next();
  }
    
};

export default {
  validateSignUp
};