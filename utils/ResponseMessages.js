const ResponseMessages = {
  // Success messages
  REGISTRATION_SUCCESS: {
    success: true,
    message: "Registration successful!",
    statusCode: 201
  },
  LOGIN_SUCCESS: {
    success: true,
    message: "Login successful.",
    statusCode: 200
  },
  

  // Error messages
  EMAIL_ALREADY_EXISTS: {
    success: false,
    message: "Email already exists. Please use a different email.",
    statusCode: 409
  },
  NUMBER_ALREADY_EXISTS: {
    success: false,
    message: "Mobile number already exists.Please use a different Number.",
    statusCode: 409
  },
  USER_NOT_FOUND: {
    success: false,
    message: "User not found. Please check your credentials.",
    statusCode: 404
  },
  INVALID_CREDENTIALS: {
    success: false,
    message: "Invalid email or password. Please try again.",
    statusCode: 401
  },
  VALIDATION_ERROR: {
    success: false,
    message: "Please provide all required fields.",
    statusCode: 400
  },
  PASSWORD_LENGTH: {
    success: false,
    message: "Password must be at least 6 characters long",
    statusCode: 400
  },
  NUMBER_LENGTH: {
    success: false,
    message: "Mobile number must be exactly 10 digits",
    statusCode: 400
  },
};

module.exports = ResponseMessages;