import { Roles } from '../../enums/roles.enum';

/**
 * Data transfer object , used to transform the request data
 */
export class UserDto {
  readonly phoneNumber: string;
  readonly fullName: string;
  password: string;
  readonly rememberMe: boolean;
  readonly role: Roles;
}
