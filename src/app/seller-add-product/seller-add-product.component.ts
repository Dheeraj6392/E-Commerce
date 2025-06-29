import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  constructor(private http: HttpClient, private products: ProductsService) { }
  addProductMessage: string | undefined;
  addproduct(data: product) {

    //  **************** initial code before localStorage

    // console.warn(data);
    // this.products.addProducts(data).subscribe((result)=>{
    //   console.log(result);
    //   if(result){
    //     this.addProductMessage="Product is successfuly added";
    //     console.log("Added");
    //   }
    //   setTimeout(()=>(this.addProductMessage=undefined) , 3000);
    // });

    // *************************


    // after ************
    this.products.addProducts(data);
    this.addProductMessage = "Product is successfuly added";
    setTimeout(() => (this.addProductMessage = undefined), 3000)
    // ***************

  }

}
