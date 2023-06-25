import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private cs:CartService,
    private router:Router, 
    private ds:DataService,
    private userService:UserService) { }
  cartCount:number=0;
  user!:User;

  ngOnInit(): void {
    this.cs.getCartObservable().subscribe((newCart)=>{
      this.cartCount=newCart.totalCount;
    });

    this.userService.userObservable.subscribe((newUser)=>{
      this.user=newUser;
    })
  }

  logOut(){
    this.userService.logout();
  }

  isAuth(){
    return this.user.token;
  }

}
