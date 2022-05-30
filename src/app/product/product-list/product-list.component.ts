import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  // productService: ProductService = new ProductService();


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    // this.products = this.productService.getAll();
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    }, (error) => {
      console.log(error);
    });
  }

}
