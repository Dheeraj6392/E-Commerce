import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true
  authError: string = "";
  constructor(private user: UserService, private product: ProductsService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  SignUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn(result);
      if (result) {
        this.authError = "User not found"
      } else {
        this.localCartToRemoteCart();
      }

    })
  }
  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      // cartDataList.forEach((product:product, index)=>{
      //   let cartData:cart={
      //     ...product,
      //     productId:product.id,
      //     userId
      //   }
      //   delete cartData.id;
      //   setTimeout(() => {
      //     this.product.addToCart(cartData).subscribe((result)=>{
      //       if(result){
      //         console.warn("data is stored in DB");
      //       }
      //     })
      //   }, 500);
      //   if(cartDataList.length===index+1){
      //     localStorage.removeItem('localCart')
      //   }
      // })
    }

    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);

  }

}