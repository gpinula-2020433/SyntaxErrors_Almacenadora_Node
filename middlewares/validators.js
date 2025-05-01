import { body } from "express-validator";
import {
  validateErrors,
  validateErrorsWithoutFiles,
} from "./validate.errors.js";
import {
  existEmail,
  existUsername,
  notRequiredField,
  existEmailSupplier,
  existEmailClient,
} from "../utils/db.validators.js";

// ✅ VALIDACIÓN REGISTRO USUARIO
export const registerValidation = [
  body("name", "Name cannot be empty").notEmpty(),
  body("surname", "Surname cannot be empty").notEmpty(),
  body("username", "Username cannot be empty")
    .notEmpty()
    .toLowerCase()
    .custom(existUsername),
  body("email", "Email cannot be empty")
    .notEmpty()
    .isEmail()
    .custom(existEmail),
  body("password", "Password cannot be empty")
    .notEmpty()
    .isStrongPassword()
    .withMessage("Password must be strong")
    .isLength({ min: 8 })
    .withMessage("Password needs min characters"),
  body("phone", "Phone cannot be empty").notEmpty().isMobilePhone(),
  validateErrors,
];

// ✅ VALIDACIÓN ACTUALIZACIÓN USUARIO
export const updateUserValidator = [
  body("username", "Username cannot be empty")
    .notEmpty()
    .toLowerCase()
    .custom((username, { req }) => existUsername(username, req.user)),
  body("email", "Email cannot be empty")
    .notEmpty()
    .isEmail()
    .custom((email, { req }) => existEmail(email, req.user)),
  body("password", "Password cannot be empty")
    .notEmpty()
    .isStrongPassword()
    .withMessage("Password must be strong")
    .isLength({ min: 8 })
    .withMessage("Password needs min characters"),
  body("profilePicture", "Profile picture cannot be empty").notEmpty(),
  body("role", "Role cannot be empty").notEmpty(),
  validateErrorsWithoutFiles,
];

// ✅ VALIDACIONES CATEGORÍA
export const registerCategory = [
  body("nameCategory", "Category name cannot be empty").notEmpty(),
  validateErrors,
];

export const updateCategory = [
  body("nameCategory", "Category name cannot be empty").notEmpty(),
  validateErrors,
];

// ✅ VALIDACIONES PRODUCTO
export const registerProduct = [
  body("nameProduct", "Product name cannot be empty").notEmpty(),
  body("price", "Price must be a valid number").notEmpty().isNumeric(),
  body("stock", "Stock must be a valid number").notEmpty().isNumeric(),
  body("category", "Category is required").notEmpty(),
  validateErrors,
];

export const updateProduct = [
  body("nameProduct", "Product name cannot be empty").notEmpty(),
  body("price", "Price must be a valid number").notEmpty().isNumeric(),
  body("stock", "Stock must be a valid number").notEmpty().isNumeric(),
  body("category", "Category cannot be empty").notEmpty(),
  validateErrors,
];

// ✅ VALIDACIONES PROVEEDOR
export const registerSupplier = [
  body("name", "Name cannot be empty").notEmpty(),
  body("description", "Description cannot be empty").notEmpty(),
  body("address", "Address cannot be empty").notEmpty(),
  body("email", "Email is not valid")
    .notEmpty()
    .isEmail()
    .custom(existEmailSupplier),
  body("phone", "Phone is not valid")
    .notEmpty()
    .isMobilePhone(),
  validateErrors,
];

export const updateSupplier = [
  body("name", "Name cannot be empty").notEmpty(),
  body("description", "Description cannot be empty").notEmpty(),
  body("address", "Address cannot be empty").notEmpty(),
  body("email", "Email is not valid")
    .notEmpty()
    .isEmail()
    .custom((email, { req }) => existEmailSupplier(email, req.user)),
  body("phone", "Phone is not valid")
    .notEmpty()
    .isMobilePhone(),
  validateErrors,
];

// ✅ VALIDACIONES CLIENTE
export const registerClientValidator = [
  body("name", "Name cannot be empty").notEmpty(),
  body("address", "Address cannot be empty").notEmpty(),
  body("email", "Email is not valid")
    .notEmpty()
    .isEmail()
    .custom(existEmailClient),
  body("phone", "Phone is not valid")
    .notEmpty()
    .isMobilePhone(),
  validateErrors,
];

export const updateClientValidator = [
  body("name", "Name cannot be empty").notEmpty(),
  body("address", "Address cannot be empty").notEmpty(),
  body("email", "Email is not valid")
    .notEmpty()
    .isEmail()
    .custom((email, { req }) => existEmailClient(email, req.user)),
  body("phone", "Phone is not valid")
    .notEmpty()
    .isMobilePhone(),
  validateErrors,
];
