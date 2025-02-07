import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { 
  }
  addProducts(data : product){
   return this.http.post('http://localhost:3000/Products' , data);
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/Products');
  }

  deleteProduct(id : number){
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }
}
