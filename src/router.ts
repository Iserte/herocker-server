import { Request, Response, Router } from "express";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";

const router = Router();

router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users", UserController.create);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

router.use(authMiddleware);

router.get("/teste", (request: Request, response: Response) => {
  return response.send(true);
});

export default router;
