import { E } from "@angular/cdk/keycodes";
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
export class LocalStorageService {
    
    setItem(name: any, data: any) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    removeItem(name: any) {
        localStorage.removeItem(name);
    }

    getItem(name: any) {
        return JSON.parse(localStorage.getItem(name)!);
    }

    addCart(cartItem: any) {
        if(localStorage.getItem("user-cart") === null) {
            localStorage.setItem("user-cart", JSON.stringify([cartItem]));
        } else {
            let cart = JSON.parse(localStorage.getItem("user-cart")!);
            cart.push(cartItem);
            localStorage.setItem("user-cart", JSON.stringify(cart));
        }
    }

    getCart() {
        if(localStorage.getItem("user-cart") === null) {
            return "";
        } else {
            let cart = JSON.parse(localStorage.getItem("user-cart")!);
            return cart;     
        }
    }

    removeCartItem(index: any) {
        if(localStorage.getItem("user-cart") !== null) {
            let cart = JSON.parse(localStorage.getItem("user-cart")!);
            cart.splice(index,1);
            localStorage.setItem("user-cart", JSON.stringify(cart));
            return cart;
        }
    }
}