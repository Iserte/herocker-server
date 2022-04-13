import { Request, Response } from "express";
import DataSource from "../../database/DataSource";
import { HardDrive } from "../models/Harddrive";
import { Internet } from "../models/Internet";
import { Memory } from "../models/Memory";
import { PC } from "../models/PC";
import { Processor } from "../models/Processor";
import { User } from "../models/User";

const userRepository = DataSource.getRepository(User);
const pcRepository = DataSource.getRepository(PC);

const processorRepository = DataSource.getRepository(Processor)
const harddriveRepository = DataSource.getRepository(HardDrive)
const memoryRepository = DataSource.getRepository(Memory)
const internetRepository = DataSource.getRepository(Internet)

class UserController {
  async index(_request: Request, response: Response) {
    const users = (await userRepository.find())
      .map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
      }))

    return response.json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const user = await userRepository.findOne({ where: { id }, relations: { pc: true } })
    if (!user) {
      return response.status(400).json({ error: "User not found" })
    }

    const pc = await pcRepository.findOne({
      where: {
        user: { id }
      },
      relations: {
        processor: true,
        harddrive: true,
        memory: true,
        internet: true
      }
    })
    return response.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      pc
    });
  }

  async create(request: Request, response: Response) {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      return response.status(400).json({ error: "Validation fails." })
    }

    if (await userRepository.findOneBy({ email })) {
      return response.json({ error: "E-mail already taken" });
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    await userRepository.save(user)

    const pc = new PC();
    pc.user = user;
    pc.harddrive = (await harddriveRepository.findOne({ where: { id: 1 } }))!;
    pc.internet = (await internetRepository.findOne({ where: { id: 1 } }))!;
    pc.ip = "0.0.0.0"
    pc.memory = (await memoryRepository.findOne({ where: { id: 1 } }))!;
    pc.processor = (await processorRepository.findOne({ where: { id: 1 } }))!;
    await pcRepository.save(pc)

    return response.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      pc: {
        id: pc.id,
        ip: pc.ip,
        processor: pc.processor,
        harddrive: pc.harddrive,
        memory: pc.memory,
        internet: pc.internet,
      }
    });
  }
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { username, email, password } = request.body;

    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return response.json({ error: "User doesnt exists" });
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
      return response.json({ error: "User doesnt exists" });
    }

    return response.json(await userRepository.delete({ id: user.id }));
  }
}

export default new UserController();
