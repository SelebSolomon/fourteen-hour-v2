import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpInput, SignUpResponse } from 'src/graphql';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UsersService,
    // private authService: AuthService,
  ) {}

  @Mutation('signup')
  signup(
    @Args('signupInput') signupInput: SignUpInput,
  ): Promise<SignUpResponse> {
    return this.userService.create(signupInput);
  }
}
