import prisma from '@shared/infra/prisma/client';
import { Prisma, Statment } from '@prisma/client';

import IStatmentRepository from '@modules/statment/repositories/IStatmentRepository';
import ICreateStatmentDTO from '@modules/statment/dtos/ICreateStatmentDTO';

export default class StatmentRepository implements IStatmentRepository {
  private ormRepository: Prisma.StatmentDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.statment;
  }

  public async findByID(id: string): Promise<Statment | null> {
    const statment = await this.ormRepository.findUnique({
      where: { id },
    });

    return statment;
  }

  public async create(data: ICreateStatmentDTO): Promise<Statment> {
    const statment = await this.ormRepository.create({ data });

    return statment;
  }

  public async delete(id: string): Promise<Statment> {
    const statment = await this.ormRepository.delete({ where: { id } });

    return statment;
  }

  public async findAllStatment(): Promise<Statment[] | null> {
    const statment = await this.ormRepository.findMany();

    return statment;
  }

  public async updateImage(id: string, newImage: string): Promise<Statment> {
    const statment = await this.ormRepository.update({ where: { id }, data: { image: newImage } });

    return statment;
  }
}
