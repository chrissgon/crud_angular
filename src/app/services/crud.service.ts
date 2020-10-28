import { Product, Products } from "./products.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  constructor(private http: HttpClient) {}

  List(): Observable<Products> {
    return this.http.get<Products>("/api/products/list");
  }

  Create(product: Product): Observable<Product> {
    const body = new HttpParams()
      .set("nome", product.nome)
      .set("marca", product.marca)
      .set("modelo", product.modelo)
      .set("preco", product.preco)
      .set("link_foto", product.link_foto)
      .set("descricao", product.descricao);

    return this.http.post<Product>("/api/products/create", body.toString(), {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
    });
  }

  Edit(product: Product): Observable<Product> {
    const body = new HttpParams()
      .set("nome", product.nome)
      .set("marca", product.marca)
      .set("modelo", product.modelo)
      .set("preco", product.preco)
      .set("link_foto", product.link_foto)
      .set("descricao", product.descricao);

    return this.http.put<Product>(
      `/api/products/${product._id}/update`,
      body.toString(),
      {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        ),
      }
    );
  }

  Delete(id: string): Observable<any> {
    return this.http.delete(`/api/products/${id}/delete`);
  }
}
