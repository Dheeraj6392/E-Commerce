import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  currentUser: any;
  searchResult: undefined | product[];
  cartCount: number = 0;
  searchText = '';
  filteredProducts: product[] = [];
  allProducts: product[] = [];
  showDropdown = false;

  isLoggedIn: boolean = false;
  constructor(private router: Router, private product: ProductsService) {
    this.allProducts = this.product.productList(); // load all products
  }
  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('user');

    if (this.isLoggedIn) {
      this.currentUser = JSON.parse(localStorage.getItem('user')!);
    }


    this.product.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });
  }


  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/user-auth']);
  }



  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.length;
  }










  onSearchChange() {
    const query = this.searchText.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    this.showDropdown = this.filteredProducts.length > 0;
  }

  onSearchFocus() {
    if (this.searchText) this.showDropdown = true;
  }

  selectProduct(product: product) {
    this.searchText = product.name;
    this.showDropdown = false;
    // Optional: Navigate to product page
    // this.router.navigate(['/product', product.id]);
  }

  performSearch() {
    // Optional: Implement full search navigation or filter logic here
    console.log('Search for:', this.searchText);
    this.showDropdown = false;
  }

  // Optional: clickOutside directive or alternative
  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
    if (!target.closest('.nav-search')) {
      this.showDropdown = false;
    }
  }


  hideDropdown() {
    this.showDropdown = false;
  }
}