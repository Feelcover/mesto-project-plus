import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} from "../controllers/users";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.post("/", createUser);
usersRouter.patch("/me", updateUser);
usersRouter.patch("/me/avatar", updateUserAvatar);

export default usersRouter;
