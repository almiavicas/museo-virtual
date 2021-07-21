import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: "dialog-errorLogin",
  templateUrl: "dialog-errorLogin.html",
})
export class DialogErrorLogin {
  constructor(public dialogRef: MatDialogRef<DialogErrorLogin>) {}

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.close();
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      check: false,
    });
  }

  onSubmit(values) {
    if (this.form.valid) {
      this.apiService.login(values.correo, values.password).subscribe(
        (loginresponse) => {
          if (loginresponse.ok) {
            this.apiService.changeRole();
            this.dialogRef.close({
              result: true,
            })
          }
        },
        (error) => {
          const dialogRef = this.dialog.open(DialogErrorLogin);
        }
      );
    }
  }

}
