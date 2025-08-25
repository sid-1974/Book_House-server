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
  USER_FOUND: {
    success: true,
    message: "User found successfully.",
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
};

module.exports = ResponseMessages;