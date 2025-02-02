import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import GetByIdService from '@modules/users/services/GetByIdService';
import GetAllUsersService from '@modules/users/services/GetAllUsersService';
import RankUsersService from '@modules/users/services/RankUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({ user, token });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
      language,
      name,
      image,
      active,
      score,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      password,
      language,
      name,
      image,
      active,
      score,
    });

    user.password = '###';

    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute(id);

    return res.status(200).json(user);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const users = container.resolve(GetByIdService);

    const user = await users.execute({ id });

    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      password, language, name, image, active, score,
    } = req.body;

    const users = container.resolve(UpdateUserService);

    const user = await users.execute(id, {
      password, language, name, image, active, score,
    });

    return res.status(200).json(user);
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = container.resolve(GetAllUsersService);

    const user = await users.execute();

    return res.status(200).json(user);
  }

  public async rankUsers(req: Request, res: Response): Promise<Response> {
    const users = container.resolve(RankUsersService);

    const user = await users.execute();

    return res.status(200).json(user);
  }
}
