import express from "express";
import {
  createRole,
  deleteUserRole,
  getAllRoles,
  getRoleById,
  updateUserRole,
} from "../../controllers/userRolesController.js";

const router = express.Router();

router.route("/all").get(getAllRoles);
router.route("/new").post(createRole);
router
  .route("/:id")
  .get(getRoleById)
  .put(updateUserRole)
  .delete(deleteUserRole);

export default router;
