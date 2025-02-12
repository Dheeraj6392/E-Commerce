import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private product: ProductsService) { }
  menuType: string = 'default';
  sellerName: string = "";
  searchResult: undefined | product[];
  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      console.warn(val);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn("in seller area")
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;

          } 
        } else {
          console.warn("outside seller");
          this.menuType = 'default';
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/home']);
  }

  searchProduct(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    if (element.value) {
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`])
  }

  redirectToDetails(id : number){
    this.router.navigate(['/details/'+id]);
  }
}
