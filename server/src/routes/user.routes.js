import { Router } from "express";
import { auth } from "../middleware/auth.js";


let userController = {};
try {

  const mod = await import("../controllers/user.controller.js");
  userController = mod.default || mod;
} catch (err) {

  console.warn("user.routes: failed to import user.controller.js — using fallback handlers.", err?.message || err);
}

const router = Router();


const missing = (name) => (req, res) =>
  res.status(501).json({ ok: false, message: `Handler ${name} not implemented on server` });

const getProfile = userController.getProfile || userController.profile || missing("getProfile/profile (user.controller)");
const updateProfile = userController.updateProfile || userController.update || missing("updateProfile/update (user.controller)");
const getAllUsers = userController.getAllUsers || userController.listUsers || missing("getAllUsers/listUsers (user.controller)");
const getUser = userController.getUser || userController.findUser || missing("getUser/findUser (user.controller)");
const deleteUser = userController.deleteUser || userController.removeUser || missing("deleteUser/removeUser (user.controller)");


router.get("/me", auth, getProfile);        
router.put("/me", auth, updateProfile);     


router.get("/", auth, getAllUsers);         
router.get("/:id", auth, getUser);
router.delete("/:id", auth, deleteUser);     

export default router;
