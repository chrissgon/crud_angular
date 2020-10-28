import { Products, Product } from "../../../services/products.model";
import { CrudService } from "./../../../services/crud.service";
import { ModalComponent } from "src/app/components/modal/modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-crud",
  templateUrl: "./crud.component.html",
  styleUrls: ["./crud.component.css"],
})
export class CrudComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private crud: CrudService
  ) {}

  products: Products;

  displayedColumns: string[] = [
    "nome",
    "marca",
    "modelo",
    "preco",
    "link",
    "descricao",
    "acoes",
  ];

  ngOnInit(): void {
    this.List();
  }

  List(): void {
    this.crud.List().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        this.openSnackBarError();
      }
    );
  }
  openDialogCreate(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: "600px",
      data: { action: "Criação" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.List();
    });
  }

  openDialogEdit(product): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: "600px",
      data: { action: "Edição", product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.List();
    });
  }

  openSnackBar() {
    this.snackBar.open("Item excluído", "Fechar", {
      duration: 2000,
    });
  }

  openSnackBarError() {
    this.snackBar.open("Ocorreu um erro ao realizar a ação", "Fechar", {
      duration: 2000,
      verticalPosition: "top",
    });
  }

  Delete(id: string): void {
    this.crud.Delete(id).subscribe(
      (response) => {
        this.List();
        this.openSnackBar();
      },
      (error) => {
        this.List();
        this.openSnackBar();
      }
    );
  }
}
