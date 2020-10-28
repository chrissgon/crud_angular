import { CrudService } from "./../../services/crud.service";
import { CrudRoutingModule } from "./crud-routing.module";
import { NgModule } from "@angular/core";
import { CrudComponent } from "./pages/crud.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [CrudComponent],
  imports: [
    BrowserModule,
    CommonModule,
    CrudRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class CrudModule {}
