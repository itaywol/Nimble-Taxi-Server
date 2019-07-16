import { Roles } from "src/enums/roles.enum";

export interface IUser {
    phoneNumber:string;
    fullName:string;
    password:string;
    rememberMe:Boolean;
    Verified:boolean;
    role:Roles;
    
}


