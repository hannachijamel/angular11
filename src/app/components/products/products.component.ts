
import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum} from 'src/app/state/product.state';
import{catchError,map,startWith} from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable <AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productservice:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  onGetAllProducts(){
    console.log("start...")

    this.products$=
    this.productservice.getAllProducts().pipe(map(data=>

      {console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
    ));
    }
    onGetSelectedProduct(){
    this.products$=
    this.productservice.getSelectedProducts().pipe(map(data=>

      {console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
    ));

    }
    onGetAvailableProduct(){
   this.products$=
    this.productservice.getAvailableProducts().pipe(map(data=>

      {console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
    ));

    }
    onSearch(dataForm:any){
      this.products$=
    this.productservice.searchProducts(dataForm.keyword).pipe(map(data=>

      {console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message})
    ));
      
    }
    onSelect(p:Product){
      return this.productservice.select(p).subscribe(data=>{
        p.selected=data.selected;
      })
    }
    onDelete(p:Product){
    let v = confirm("etez vous sur");
    if(v==true)

   
       this.productservice.deleteProduct(p).subscribe(data=>{
        this.onGetAllProducts();
      })
    

    
  }
  onNewProduct(){
    this.router.navigateByUrl("/newProduct");

  }
  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);

  }

  }
    



  


