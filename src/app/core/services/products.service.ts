import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({}),
};

@Injectable({
    providedIn: 'root',
})
export class ProductsService {

    BASE_URL: string = environment.baseUrl + "api/";

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    getAllProducts() {
        return this.httpClient.get(this.BASE_URL + 'product/getAll');
    }

    createProduct(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'product/create', payload);
    }

    editProduct(id:any, payload: any) {
        return this.httpClient.patch(this.BASE_URL + 'product/update/'+id, payload);
    }

    getProduct(id:any) {
        return this.httpClient.get(this.BASE_URL + 'product/getOne/'+id);
    }

    deleteProduct(id:any) {
        return this.httpClient.delete(this.BASE_URL + 'product/delete/'+id)
    }

    uploadProductImage(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'product/productImage/upload', payload);
    }

    //Product types
    getAllProductTypes() {
        return this.httpClient.get(this.BASE_URL + 'product_type/getAll');
    }

    createProductType(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'product_type/create', payload);
    }

    editProductType(id:any, payload: any) {
        return this.httpClient.patch(this.BASE_URL + 'product_type/update/'+id, payload);
    }

    getProductType(id:any) {
        return this.httpClient.get(this.BASE_URL + 'product_type/getOne/'+id);
    }

    deleteProductType(id:any) {
        return this.httpClient.delete(this.BASE_URL + 'product_type/delete/'+id)
    }

    uploadProductTypeImage(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'product_type/productTypeImage/upload', payload);
    }
}