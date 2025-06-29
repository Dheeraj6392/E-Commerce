import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  constructor(private productService: ProductsService) { }
  ngOnInit() {
    this.productService.popularProducts().subscribe((data) => {
      console.warn(data);
      this.popularProducts = data;
    });
    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    })
  }

  addToCart(item: product) {
    this.productService.addToLocalCart(item);
    alert('Product added to cart!');
  }
}
