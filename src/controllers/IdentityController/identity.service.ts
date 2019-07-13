import { Injectable } from '@nestjs/common';
import {identityDto} from "../../models/identitydto";

@Injectable()
export class IdentityService {
    private readonly identities: identityDto[] = [];
    create(identity: identityDto)
    {
        this.identities.push(identity);
    }

    findAll(): identityDto[]
    {
        return this.identities;
    }
}
