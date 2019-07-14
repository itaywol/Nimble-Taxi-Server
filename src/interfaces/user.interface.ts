import { Roles } from "src/enums/roles.enum";

export interface User {
    id:number,
    phoneNumber:string,
    fullName:string,
    Verified:boolean,
    role:Roles,
    
}
