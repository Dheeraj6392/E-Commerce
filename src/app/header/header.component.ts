import { Component , OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
   constructor(private router : Router){}
   menuType : string = 'default';
   sellerName : string  = '';
   ngOnInit(){
      this.router.events.subscribe((val : any)=>{
        console.warn(val);
        if(val.url){
          if(localStorage.getItem('seller') && val.url.includes('seller')){
              console.warn("in seller area")
              this.menuType = "seller";
              if(localStorage.getItem('seller')){
                let sellerStore = localStorage.getItem('seller');
                let sellerData = sellerStore && JSON.parse(sellerStore)[0];
                this.sellerName = sellerData.Name;
                
              }
          }else{
            console.warn("outside seller");
            this.menuType = 'default';
          }
        }
      })
   }

   logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/home']);
   }
}
