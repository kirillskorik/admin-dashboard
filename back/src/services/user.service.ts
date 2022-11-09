import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import { UserDto } from "src/dto/user.dto";
import { User, UserEdited } from "../interfaces/user.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async register(userDto: UserDto) {
    const { email, password } = userDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword });

    try {
      const isUsedEmail = await this.findOne(email);
      if (isUsedEmail) throw new ConflictException("User already exists");

      await user.save();

      const payload = {
        email: user.email,
        sub: user._id,
      };

      return {
        username: user.email,
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async login(user: User) {
    const check = await this.validateUser(user.email, user.password);

    if (!check) {
      throw new HttpException(
        "Email or password is not correct",
        HttpStatus.BAD_REQUEST
      );
    }

    const payload = {
      email: user.email,
      sub: user._id,
    };

    return {
      username: user.email,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }

  async findOne(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<UserEdited[]> {
    try {
      const users = await this.userModel.find().exec();
      const result = users.map((item) => {
        return {
          id: item._id,
          email: item.email,
        };
      });

      return result;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      const deletedUser = await this.userModel
        .findByIdAndRemove({ _id: id })
        .exec();
      if (!deletedUser) {
        throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
      }
      return deletedUser;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
