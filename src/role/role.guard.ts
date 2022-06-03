import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService
    ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => user.roles?.includes(role));
    const request = context.switchToHttp().getRequest();
    const id = await this.authService.loggedInUser(request);
    const user:User = await this.userService.findOne({ id }, ["role"])
    const role:Role = await this.roleService.findOne({id:user.role.id})
    console.log(requiredRoles)
    console.log(requiredRoles[0])

    if(user.role.name === requiredRoles[0]){
      return true;
    }
    // return role.name = requiredRoles;
    // // return true;
  }
}