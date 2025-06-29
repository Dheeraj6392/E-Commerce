import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSeederService {
  constructor(private http: HttpClient) {}

  initLocalData() {
    const isInitialized = localStorage.getItem('dbInitialized');
    if (isInitialized) return;

    this.http.get('db.json').subscribe((data: any) => {
      localStorage.setItem('seller', JSON.stringify(data.seller || []));
      localStorage.setItem('Products', JSON.stringify(data.Products || []));
      localStorage.setItem('users', JSON.stringify(data.users || []));
      localStorage.setItem('cart', JSON.stringify(data.cart || []));
      localStorage.setItem('orders', JSON.stringify(data.orders || []));
      localStorage.setItem('dbInitialized', 'true');
    });
  }
}
