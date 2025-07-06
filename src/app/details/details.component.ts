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
  constructor(private activeRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const productId = Number(params.get('productId'));
      if (productId) {
        this.productService.getProduct(productId).subscribe((result) => {
          this.productData = result;
          console.log(this.productData);
        });
      }
    });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity--;
    }
  }

  addToCart(item: product) {
    this.productService.addToLocalCart(item);
    alert('Product added to cart!');
  }
}
