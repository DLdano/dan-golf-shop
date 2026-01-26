import { inject, Injectable } from "@angular/core";
import { HttpErrorService } from "../utilities/http-error.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Product } from "./product.model";

@Injectable({ 
    providedIn: 'root' 
})

export class ProductService {
    private productsUrl = 'https://localhost:7275/api/products';
    private errorService = inject(HttpErrorService);
    private http = inject(HttpClient);

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl)
            .pipe(
                catchError((err) => this.handleError(err))
            )
    }

    getProduct(id: number): Observable<Product> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(url)
            .pipe(
                catchError((err) => this.handleError(err))
            );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        const formattedMessage = this.errorService.formatError(err);
        return throwError(() => formattedMessage);
  }
}