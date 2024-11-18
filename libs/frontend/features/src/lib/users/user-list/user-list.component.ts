import { Component } from '@angular/core';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent {

    users: IUserInfo[] = [
        {
            _id: "1",
            name: "John Doe",
            emailAddress: "j.doe@mail.com",
            profileImgUrl: "https://picsum.photos/seed/picsum/200/300",
            role: UserRole.Unknown,
            gender: UserGender.Male,
            password: "secret",
            isActive: true
        },
        {
            _id: "2",
            name: "Jane Doe",
            emailAddress: "j.doe2@mail.com",
            profileImgUrl: "https://picsum.photos/seed/picsum/200/300",
            role: UserRole.Unknown,
            gender: UserGender.Male,
            password: "secret",
            isActive: true
        }

    ]
        

}
