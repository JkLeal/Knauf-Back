import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(id: string, data: IUpdateUserDTO): Promise<Users> {
    const userExists = this.usersRepository.findById(id);

    if (!userExists) throw new AppError('A user with this id does not exist');
    if (data.password) {
      const hashedPassword = await this.hashProvider.generateHash(data.password);
      // eslint-disable-next-line no-param-reassign
      data.password = hashedPassword;
    }
    const user = await this.usersRepository.update(id, data);

    return user;
  }
}
