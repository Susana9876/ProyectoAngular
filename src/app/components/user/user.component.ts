import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _router: ActivatedRoute, private userService: UsersService) { }

  user: any = [];
  deleted: boolean = false;

  ngOnInit(): void {
    this._router.params.subscribe( params => {
      this.userService.getUser(params['id']).subscribe( (data: any) => {
        this.user = data.data;
      } );
    } )
  }

  delete(){
    this.userService.deleteUser(this.user.id).subscribe( (data: any) => {
      this.deleted = true;
    } , (error: any) => {
      this.deleted = false;
    })
  }
}
