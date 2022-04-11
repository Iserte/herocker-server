import { Request, Response } from "express";
import DataSource from "../../database/DataSource";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const BCRYPT_SALT = process.env.BCRYPT_SALT!;
const userRepository = DataSource.getRepository(User);

class UserController {
  async index(request: Request, response: Response) {
    return response.json(await userRepository.find());
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    return response.json(await userRepository.findOneBy({ id }));
  }

  async create(request: Request, response: Response) {
    const { username, email, password } = request.body;
    if (await userRepository.findOneBy({ email })) {
      return response.json({error: "E-mail already taken"});
    }

    const encryptedPassword = await bcrypt.hash(password, BCRYPT_SALT);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = encryptedPassword;

    return response.json(await userRepository.save(user));
  }
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { username, email, password } = request.body;

    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return response.json({error: "User doesnt exists"});
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    return response.json(await userRepository.save(user));
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return response.json({error: "User doesnt exists"});
    }

    return response.json(await userRepository.delete(user));
  }
}

export default new UserController();
