import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cartItemCount=new BehaviorSubject(0); // to hold cart item count

  searchTerm = new BehaviorSubject(''); // to hold search value
 // Using Behavior Subject to pass a stream of data from one component to another 

  constructor(private http:HttpClient ) {
    this.cartCount()
   }

BASE_URL = 'https://e-cart-pr5y.onrender.com'

  // api function to get all products from data base
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  // api function to view a particular product from the database
 viewProduct(id:any){
  return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
 }
 
 //api function to add products to wishlist
 addTowishlist(id:any,title:any,price:any,image:any){
  const body = {id,title,price,image}
   return this.http.post(`${this.BASE_URL}/wishlists/add-to-wishlist`,body)
 }

 //api function to view wishlist products
 viewWishlist(){
  return this.http.get(`${this.BASE_URL}/wishlists/view-all-wishlists`)
 }

 //api function to delete particular product from wishlist
 deleteWishlistProduct(id:any){
  return this.http.delete(`${this.BASE_URL}/wishlists/delete-wishlist-product/${id}`)
 }


 //api function to add to cart
 addToCart(product:any){
  // get the product details - id,title,price,image,qauntity
  const body = {
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity:product.quantity
  }
  return this.http.post(`${this.BASE_URL}/carts/add-to-cart`,body)
 } 

 // api function to get cart
 getCart(){
   return this.http.get(`${this.BASE_URL}/carts/get-cart`)
 }
 
 //api function for cart items count
 cartCount(){
  this.getCart().subscribe((result:any)=>{
    this.cartItemCount.next(result.length)
  })
 }


 //api function to delete a item from cart
 deleteCartProduct(id:any){
  return this.http.delete(`${this.BASE_URL}/carts/delete-product/${id}`)
 }

//increment cart product count
incrementProduct(id:any){
  return this.http.get(`${this.BASE_URL}/carts/increment-product/${id}`)
}

//decrement cart product count
decrementProduct(id:any){
  return this.http.get(`${this.BASE_URL}/carts/decrement-product/${id}`)
}

}
