import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserDetails,
  updateUser,
} from "../../controllers/userController.js";

const router = express.Router();

router.route("/me").get(getUserDetails);
router.route("/all").get(getAllUsers);
router.route("/new").post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
