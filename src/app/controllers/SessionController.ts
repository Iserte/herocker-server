import { Request, Response } from "express";
import jwt from "jsonwebtoken"

import DataSource from "../../database/DataSource";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRESIN = process.env.JWT_EXPIRESIN;

const userRepository = DataSource.getRepository(User);

class SessionController {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: "Validation fails." })
    }

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return response.status(401).json({ error: "User not found." });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: "Password does not match." });
    }

    const { id, username } = user;

    return response.json({
      user: {
        id,
        username,
        email
      },
      token: jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRESIN
      })
    })
  }
}

export default new SessionController();
