import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

// /api/v1/users
const useRouter = Router();

useRouter.get("/", getUsers);

useRouter.get("/:id", authorize, getUser);

useRouter.put("/:id", authorize, updateUser);

useRouter.delete("/:id", authorize, deleteUser);

export default useRouter;
