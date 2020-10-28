import { CrudService } from "./../../services/crud.service";
import { Product } from "./../../services/products.model";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crud: CrudService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  formCreate: FormGroup;
  formEdit: FormGroup;

  product: Product = {
    _id: "",
    nome: "",
    marca: "",
    modelo: "",
    preco: "",
    link_foto: "",
    descricao: "",
  };

  ngOnInit(): void {
    if (this.data.action == "Criação") {
      this.FormBuilderCreate();
    } else {
      this.FormBuilderEdit();
    }
  }

  private FormBuilderCreate(): void {
    this.formCreate = this.formBuilder.group({
      nome: [
        "",
        [
          Validators.required,
          Validators.pattern(
            `^[A-Za-z-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$`
          ),
        ],
      ],
      marca: [
        "",
        [
          Validators.required,
          Validators.pattern(
            `^[A-Za-z-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$`
          ),
        ],
      ],
      modelo: [
        "",
        [
          Validators.required,
          Validators.pattern(
            `^[A-Za-z0-9-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$`
          ),
        ],
      ],
      preco: ["", [Validators.required, Validators.pattern(`^[0-9]*$`)]],
      link: [
        "",
        Validators.pattern(
          `(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?`
        ),
      ],
      descricao: ["", Validators.maxLength(255)],
    });
  }

  private FormBuilderEdit(): void {
    this.formEdit = this.formBuilder.group({
      nome: [
        this.data.product.nome,
        [
          Validators.required,
          Validators.pattern(
            `^[A-Za-z-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$`
          ),
        ],
      ],
      marca: [
        this.data.product.marca,
        [
          Validators.required,
          Validators.pattern(
            `^[A-Za-z-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$`
          ),
        ],
      ],
      modelo: [
        this.data.product.modelo,
        [
          Validators.required,
          Validators.pattern(
            `^[A-Za-z0-9-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,}$`
          ),
        ],
      ],
      preco: [
        this.data.product.preco,
        [Validators.required, Validators.pattern(`^[0-9]*$`)],
      ],
      link: [
        this.data.product.link_foto,
        Validators.pattern(
          `(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?`
        ),
      ],
      descricao: [this.data.product.descricao, Validators.maxLength(255)],
    });
  }

  Close(): void {
    this.dialogRef.close();
  }

  get FieldsCreate() {
    return this.formCreate.controls;
  }

  get FieldsEdit() {
    return this.formEdit.controls;
  }

  private ValidationCreate(): boolean {
    if (this.formCreate.invalid) {
      return false;
    }

    return true;
  }

  private ValidationEdit(): boolean {
    if (this.formEdit.invalid) {
      return false;
    }

    return true;
  }

  private getFieldsCreate(): void {
    this.product.nome = this.FieldsCreate.nome.value;
    this.product.marca = this.FieldsCreate.marca.value;
    this.product.modelo = this.FieldsCreate.modelo.value;
    this.product.preco = this.FieldsCreate.preco.value;
    this.product.link_foto = this.FieldsCreate.link.value;
    this.product.descricao = this.FieldsCreate.descricao.value;
  }

  private getFieldsEdit(): void {
    this.product._id = this.data.product._id;
    this.product.nome = this.FieldsEdit.nome.value;
    this.product.marca = this.FieldsEdit.marca.value;
    this.product.modelo = this.FieldsEdit.modelo.value;
    this.product.preco = this.FieldsEdit.preco.value;
    this.product.link_foto = this.FieldsEdit.link.value;
    this.product.descricao = this.FieldsEdit.descricao.value;
  }

  Create(): void {
    if (this.ValidationCreate()) {
      this.getFieldsCreate();

      this.crud.Create(this.product).subscribe(
        (response) => {
          this.Close();
          this.openSnackBarSucesso();
        },
        (error) => {
          this.Close();
          this.openSnackBarSucesso();
        }
      );
    }
  }

  Edit(): void {
    if (this.ValidationEdit()) {
      this.getFieldsEdit();

      this.crud.Edit(this.product).subscribe(
        (response) => {
          this.Close();
          this.openSnackBarSucesso();
        },
        (error) => {
          this.Close();
          this.openSnackBarSucesso();
        }
      );
    }
  }

  openSnackBarSucesso() {
    this.snackBar.open("Operação realizada com sucesso", "", {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ["success-snackbar"],
    });
  }
}
