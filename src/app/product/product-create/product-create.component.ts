import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  userFile: any = File;
  product: Product = {};
  productForm: FormGroup = new FormGroup({
    // id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    image: new FormControl(),
    price: new FormControl("", [Validators.required, Validators.pattern(/^\d*$/)]),
    description: new FormControl('', [Validators.required])
  })

  constructor(private productService: ProductService,
              private router: Router ) {}

  ngOnInit(): void {
  }

  onSelectFile(event: Event) {
    // @ts-ignore
    this.userFile = event.target.files[0];
  }

  get idControl(){
    return this.productForm.get('id');
  }

  get nameControl(){
    return this.productForm.get('name');
  }

  get priceControl() {
    return this.productForm.get('price');
  }

  get descriptionControl() {
    return this.productForm.get('description');
  }


  // createProduct(form) {
  //   // this.productService.create(this.product);
  //   // this.product = {};
  //   // this.router.navigateByUrl('/');
  //   this.productService.create(form.value);
  //   form.resetForm();
  // }

  //reactive
  createProductByReactive(){
    const product = new FormData();
    product.append('name', this.productForm.get('name')?.value);
    product.append('price', this.productForm.get('price')?.value);
    product.append('image', this.userFile);
    this.productService.create(product).subscribe(() =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '"created success!"',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/');
    });
    this.productForm.reset();
  }
}


