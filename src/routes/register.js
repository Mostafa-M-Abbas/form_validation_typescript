"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
router.post("/", [
    (0, express_validator_1.body)("fullName")
        .isString()
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("Full Name cannot contain numbers"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Must be a valid email")
        .custom((value) => value.endsWith("@gmail.com"))
        .withMessage("Email must be a Gmail address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8, max: 64 })
        .withMessage("Password must be between 8 and 64 characters")
        .matches(/\d/)
        .withMessage("Password must contain at least one number")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter"),
    (0, express_validator_1.body)("passwordConfirm")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Password Confirm must match Password"),
    (0, express_validator_1.body)("birthdate").isDate().withMessage("Birthdate must be a valid date"),
], validate_1.validate, (req, res) => {
    res.send("SUCCESSFUL");
});
exports.default = router;
