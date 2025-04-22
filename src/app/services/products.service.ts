import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {
  }
  addProducts(data: product) {
    return this.http.post('http://localhost:3000/Products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/Products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }

  getProduct(id: number) {
    return this.http.get<product>(`http://localhost:3000/Products/${id}`);
  }

  updateProduct(data: product) {
    return this.http.put<product>(`http://localhost:3000/Products/${data.id}`, data);
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=5');
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=8');
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/Products?category=${query}`);
  }


  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
}
