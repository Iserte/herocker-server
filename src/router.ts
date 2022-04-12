import { Request, Response, Router } from "express";
import authMiddleware from "./app/middlewares/authMiddleware";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

const router = Router();

router.get("/users", UserController.index);
router.post("/users", UserController.create);

router.post("/session", SessionController.store)

router.use(authMiddleware);

router.get("/users/:id", UserController.show);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

export default router;
