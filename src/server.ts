import "dotenv/config";
import "reflect-metadata";
import DataSource from "./database/DataSource";

import { Processor } from "./app/models/Processor";

import Express from "./Express";
import { HardDrive } from "./app/models/Harddrive";
import { Memory } from "./app/models/Memory";
import { Internet } from "./app/models/Internet";
import { ExternalHardDrive } from "./app/models/Externalharddrive";

const express_host = process.env.EXPRESS_HOST || "localhost";
const express_port = process.env.EXPRESS_PORT as unknown as number;

DataSource.initialize().then(async () => {
  Express.listen(express_port, express_host, async () => console.log(`Server is running on: http://${express_host}:${express_port}/`));

  // Populate hardwares
  const processorRepository = DataSource.getRepository(Processor)
  const harddriveRepository = DataSource.getRepository(HardDrive)
  const memoryRepository = DataSource.getRepository(Memory)
  const internetRepository = DataSource.getRepository(Internet)
  const externalharddriveRepository = DataSource.getRepository(ExternalHardDrive)

  if ((await processorRepository.find()).length < 1) {
    const hardware = new Processor();
    hardware.name = "Prentium"
    hardware.clock = "1.0"
    hardware.cores = 1
    hardware.price = 0.00
    await processorRepository.save(hardware)
  }
  if ((await harddriveRepository.find()).length < 1) {
    const hardware = new HardDrive();
    hardware.name = "Oceangate"
    hardware.size = "80"
    hardware.price = 0.00
    await harddriveRepository.save(hardware)
  }
  if ((await memoryRepository.find()).length < 1) {
    const hardware = new Memory();
    hardware.name = "Queenston"
    hardware.size = "1"
    hardware.price = 0.00
    await memoryRepository.save(hardware)
  }
  if ((await internetRepository.find()).length < 1) {
    const hardware = new Internet();
    hardware.name = "Speedy"
    hardware.download = "1"
    hardware.upload = "0.5"
    hardware.price = 0.00
    await internetRepository.save(hardware)
  }
  if ((await externalharddriveRepository.find()).length < 1) {
    const hardware = new ExternalHardDrive();
    hardware.name = "Sanglider"
    hardware.size = "8"
    hardware.price = 0.00
    await externalharddriveRepository.save(hardware)
  }
});
