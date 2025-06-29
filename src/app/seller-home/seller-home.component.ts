import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  icon = faTrash;
  editIcon = faEdit;
  productMessage: undefined | string;
  productList: undefined | product[];
  constructor(private productService: ProductsService, private http: HttpClient) { }
  ngOnInit(): void {
    this.list();
  }

  // deleteProduct(id: number) {
  //   console.warn("test Id");
  //   this.productService.deleteProduct(id).subscribe((result) => {
  //     if (result) {
  //       this.productMessage = "Product is Deleted";
  //       this.list();
  //     }
  //   })
  // setTimeout(() => {
  //   this.productMessage = undefined
  // }, 3000)
  // }

  deleteProduct(id: number) {
    const result = this.productService.deleteProduct(id);
    if (result) {
      this.productMessage = "Product deleted successfully";
      this.list();
    }
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000)
  }

  list() {

    //  ************  inital code before localStorage

    // this.product.productList().subscribe((result) => {
    //   console.log(result);
    //   this.productList = result;
    // })

    // **************


    // after
    this.productList = this.productService.productList()
    // 
  }
}
