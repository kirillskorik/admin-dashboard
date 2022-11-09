import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/services/user.service";
import { User } from "src/interfaces/user.interface";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  async signUp(@Body(ValidationPipe) userDto: UserDto) {
    return await this.userService.register(userDto);
  }

  @Post("/login")
  async login(@Request() req) {
    return this.userService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/getAll")
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":email")
  async findOne(@Param("email") email: string): Promise<User> {
    return this.userService.findOne(email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
