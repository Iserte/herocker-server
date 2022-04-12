import { Request, Response } from "express";
import DataSource from "../../database/DataSource";
import { User } from "../models/User";

const userRepository = DataSource.getRepository(User);

class UserController {
  async index(_request: Request, response: Response) {
    return response.json(await userRepository.find());
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    return response.json(await userRepository.findOneBy({ id }));
  }

  async create(request: Request, response: Response) {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      return response.status(400).json({ error: "Validation fails."})
    }

    if (await userRepository.findOneBy({ email })) {
      return response.json({error: "E-mail already taken"});
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

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
    if (password) {
      await user.hashPassword(password);
    } else {
      user.password = user.password
    }

    return response.json(await userRepository.save(user));
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return response.json({error: "User doesnt exists"});
    }

    return response.json(await userRepository.delete({ id: user.id }));
  }
}

export default new UserController();
