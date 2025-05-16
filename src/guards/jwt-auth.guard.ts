// src/common/guards/jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Agar route `@Public()` bo'lsa, tekshirmay o'tkazamiz
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Token yo‘q');

    const token = authHeader.split(' ')[1];  
      
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      
      request.user = decoded; 
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token noto‘g‘ri yoki muddati o‘tgan');
    }
  }
}
