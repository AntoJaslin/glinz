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
export class CategoriesService {

    BASE_URL: string = environment.baseUrl + "api/category/";

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    getAllCategories() {
        return this.httpClient.get(this.BASE_URL + 'getAll');
    }

    createCategory(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'create', payload);
    }

    editCategory(id:any, payload: any) {
        return this.httpClient.patch(this.BASE_URL + 'update/'+id, payload);
    }

    getCategory(id:any) {
        return this.httpClient.get(this.BASE_URL + 'getOne/'+id);
    }

    deleteCategory(id:any) {
        return this.httpClient.delete(this.BASE_URL + 'delete/'+id)
    }

    uploadCategoryImage(payload: any) {
        return this.httpClient.post(this.BASE_URL + 'categoryImage/upload', payload);
    }
}