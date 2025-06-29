import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.cartItems = this.productService.getLocalCart();
  }

  removeItem(id: number) {
    this.productService.removeFromLocalCart(id);
    this.cartItems = this.productService.getLocalCart();
  }
}
