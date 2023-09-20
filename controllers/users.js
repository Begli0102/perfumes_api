const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/verifyToken");
const { body, validationResult } = require("express-validator");

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

   if (!name || !surname || !email || !password) {
     res.status(400);
     throw new Error("Please add all fields");
   }

  [
    body("name", "Username must be at least 5 characters").isLength({
      min: 6,
    }),
    body(
      "surname",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    body("email", "Email does not appear to be valid")
      .isEmail()
      .normalizeEmail(),
    body("password", "Password is required").not().isEmpty().isLength({
      min: 6,
      max: 9,
    }),
  ];

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //Check if user exists
  const userExists = await User.findOne({ email});

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


//Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      surname:user.surname,
      email: user.email,
      password:user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password, user.password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       surname:user.surname,
//       email: user.email,
//       password: user.password,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid Email or Password");
//   }
// });

module.exports = { registerUser, loginUser };
