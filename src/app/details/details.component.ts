import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductsService) { }

  ngOnInit(): void {
    let productId = Number(this.activeRoute.snapshot.paramMap.get('productId'));
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;
    })
  }

  handleQuantity(val : string){
    if(this.productQuantity < 20 &&  val == 'plus'){
     this.productQuantity += 1;
    }else if(this.productQuantity > 1 && val == 'min'){
       this.productQuantity--;
    }
  }

}
