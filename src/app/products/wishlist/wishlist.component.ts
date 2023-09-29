import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allWishlist:any=[];// to hold all wishlist items
  constructor (private api:ApiService){}
  
  ngOnInit(): void {
    this.api.viewWishlist().subscribe((result:any)=>{
      console.log(result);
      this.allWishlist=result
      
    },(result:any)=>{
      console.log(result.error);
      
    }
    )
  }

  //delete product from wishlist
  deleteWishlistItem(id:any){
    this.api.deleteWishlistProduct(id).subscribe((result:any)=>{
      this.allWishlist=result // assign remaining item to wihslist
      alert('product deleted')
    })
  }

}
