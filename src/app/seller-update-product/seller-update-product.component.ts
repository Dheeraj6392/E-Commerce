import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})

export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product;
  productMessage: undefined | string;


  constructor(private route: ActivatedRoute, private productService: ProductsService) { }


  ngOnInit(): void {
    let productId = Number(this.route.snapshot.paramMap.get('id')) * 10;
    console.log(productId); // '5'
    productId && this.productService.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    });
  }

  // submit(data: any) {
  //   console.warn(data);
  //   if (this.productData) {
  //     data.id = this.productData.id
  //   }
  //   this.product.updateProduct(data).subscribe((result) => {
  //     if (result) {
  //       this.productMessage = "Product has Updated"
  //     }
  //   });

  //   setTimeout(() => {
  //     this.productMessage = undefined;
  //   }, 3000)
  // }
  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id
    }
    const result = this.productService.updateProduct(data);
    if (result) {
      this.productMessage = "Product updated successfully";
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000);
    }
  }
}
