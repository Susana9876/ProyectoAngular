import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  result: any = [];
  buscando: boolean = true;
  error: boolean;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  search(id){
    if(id===''){
      this.buscando = true;
      this.error = false;
      return this.result = [];
    }
    this.userService.getUser(id).subscribe((data: any) => {
      this.result = data.data;
      this.buscando = false;
      this.error = false;
    }, (error: any) => {
      this.buscando = false;
      this.error = true;
    })
  }

}
