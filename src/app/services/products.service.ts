import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private cartSubject = new BehaviorSubject<product[]>(this.getLocalCart());
  cart$ = this.cartSubject.asObservable();
  constructor(private http: HttpClient) {
  }
  addProducts(data: product) {
    // return this.http.post('http://localhost:8080/Products', data);


    // ******  done for localstorage
    const products = this.productList();
    const newId = Date.now(); // generate unique ID
    const newProduct = { ...data, id: newId };
    products.push(newProduct);
    localStorage.setItem('Products', JSON.stringify(products));
    // *******
  }

  productList(): product[] {
    // return this.http.get<product[]>('http://localhost:8080/products');

    // ******  done for localstorage
    const products = localStorage.getItem('Products');
    return products ? JSON.parse(products) : [];
    // *******
  }

  // deleteProduct(id: number) {
  //   return this.http.delete(`http://localhost:8080/Products/${id}`)
  // }

  deleteProduct(id: number): boolean {
    const products = this.productList();
    const updatedProducts = products.filter(p => p.id !== id);
    localStorage.setItem('Products', JSON.stringify(updatedProducts));
    return true;
  }

  // getProduct(id: number) {
  //   return this.http.get<product>(`http://localhost:3000/Products/${id}`);
  // }

  getProduct(id: number) {
    const products = this.productList();
    const product = products.find(p => Number(p.id) === id);
    return of(product); // 👈 return Observable
  }



  // updateProduct(data: product) {
  //   return this.http.put<product>(`http://localhost:3000/Products/${data.id}`, data);
  // }

  updateProduct(data: product): boolean {
    const products = this.productList();
    const index = products.findIndex(p => p.id === data.id);
    if (index !== -1) {
      products[index] = data;
      localStorage.setItem('Products', JSON.stringify(products));
      return true;
    }
    return false;
  }

  // popularProducts() {
  //   return this.http.get<product[]>('http://localhost:3000/Products?_limit=5');
  // }

  popularProducts() {
    const products = this.productList();
    return of(products.slice(0, 5)); // first 5 items
  }


  // trendyProducts() {
  //   return this.http.get<product[]>('http://localhost:3000/Products?_limit=8');
  // }
  trendyProducts() {
    const products = this.productList();
    return of(products.slice(0, 8)); // first 8 items
  }

  // searchProducts(query: string) {
  //   return this.http.get<product[]>(`http://localhost:3000/Products?category=${query}`);
  // }

  // <-- Add this import

  searchProducts(query: string) {
    const products = JSON.parse(localStorage.getItem('Products') || '[]');
    const result = products.filter((item: product) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.color.toLowerCase().includes(query.toLowerCase())
    );
    return of(result); // Wrap result in Observable
  }



  // addToCart(cartData: cart) {
  //   return this.http.post('http://localhost:3000/cart', cartData);
  // }

  addToCart(cartData: product): boolean {
    const updatedCart = [...this.cartSubject.value, cartData];
    this.updateCart(updatedCart);
    return true;
  }


  // getCartList(userId: number) {
  //   return this.http
  //     .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
  //       observe: 'response',
  //     })
  //     .subscribe((result) => {
  //       if (result && result.body) {
  //         this.cartData.emit(result.body);
  //       }
  //     });
  // }

  getCartList(userId: number) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const userCart = cart.filter((item: cart) => item.userId === userId);
    this.cartSubject.next(userCart);
  }


  addToLocalCart(product: product) {
    const updatedCart = [...this.cartSubject.value, product];
    this.updateCart(updatedCart);
  }

  getLocalCart(): product[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromLocalCart(productId: number) {
    const updatedCart = this.cartSubject.value.filter(item => item.id !== productId);
    this.updateCart(updatedCart);
  }

  private updateCart(newCart: product[]) {
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.cartSubject.next(newCart);
  }

  getCartCount(): number {
    return this.cartSubject.value.length;
  }

}
