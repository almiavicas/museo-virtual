import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators,ValidationErrors } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: "dialog-errorSignUp",
  templateUrl: "dialog-errorSignUp.html",
})
export class DialogErrorSignUp {
  constructor(public dialogRef: MatDialogRef<DialogErrorSignUp>) {}

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: "dialog-successSignUp",
  templateUrl: "dialog-successSignUp.html",
})
export class DialogSuccessSignUp {
  constructor(public dialogRef: MatDialogRef<DialogSuccessSignUp>) {}

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      correo: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      validatePassword: [null, [Validators.required]],
      check: false,
    },
    {
      validators: this.validateSamePassword,
    }
    );
  }

  onSubmit(values) {
    if (this.form.valid) {
      this.apiService.signUp(values.correo, values.name, values.lastName, values.password, "admin").subscribe(
        (signupresponse) => {
          if (signupresponse.ok) {
            const dialogRef = this.dialog.open(DialogSuccessSignUp);
            this.dialogRef.close({
              result: true,
            })
          }
        },
        (error) => {
          const dialogRef = this.dialog.open(DialogErrorSignUp);
        }
      );
    }
  }

  // funcion validadora que permite saber si la contrasena y la confirmacion de la contrasena son iguales
  validateSamePassword(control: FormGroup): ValidationErrors | null {
    const clave = control.get("password");
    const confirma_clave = control.get("validatePassword");
    return clave.value === confirma_clave.value ? null : { noSonIguales: true };
  }

  checkSamePassword(): boolean {
    return (
      this.form.hasError("noSonIguales") &&
      this.form.get("password").dirty &&
      this.form.get("validatePassword").dirty
    );
  }

}