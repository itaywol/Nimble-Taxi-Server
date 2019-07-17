import { Roles } from '../../enums/roles.enum';

export class UserDto {
  readonly phoneNumber: string;
  readonly fullName: string;
  password: string;
  readonly rememberMe: boolean;
  readonly role: Roles;
}
