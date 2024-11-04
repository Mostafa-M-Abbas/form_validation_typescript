import express from "express";
import { body, validationResult } from "express-validator";
import { validate } from "../middleware/validate";

const router = express.Router();

router.post(
  "/",
  [
    body("fullName")
      .isString()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Full Name cannot contain numbers"),
    body("email")
      .isEmail()
      .withMessage("Must be a valid email")
      .custom((value) => value.endsWith("@gmail.com"))
      .withMessage("Email must be a Gmail address"),
    body("password")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be between 8 and 64 characters")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter"),
    body("passwordConfirm")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Password Confirm must match Password"),
    body("birthdate").isDate().withMessage("Birthdate must be a valid date"),
  ],
  validate,
  (req, res) => {
    res.send("SUCCESSFUL");
  }
);

export default router;
