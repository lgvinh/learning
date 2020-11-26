import { Controller, Param, Body, Get, Post, Put, Delete, Res, Req, UseBefore } from "routing-controllers";
import { Response } from "express";
import {
  UserService,
} from "../../domain/service";
import { Inject } from "typedi";
import { loggingMiddleware } from "../middleware/AuthMiddleware";
import { Testing } from "../customDecorator/AuthDecorator";
 
@Controller("/users")
// @UseBefore(loggingMiddleware)
export class UserController {
  @Inject(type => UserService)
  private userService: UserService;
 
  @Get()
  // @Testing()
  getAll() {
    return this.userService.test();
  }
 
  @Get("/:id")
  getOne(@Param("id") id: number) {
    return {
      statusCode: 200,
      status: "success",
      data: "aaa"
    };
  }

  @Post()
  post(@Body() user: any) {
    return "Saving user...";
  }

  @Put("/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
 
}