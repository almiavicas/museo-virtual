import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/signUp.component';
import { Router, NavigationExtras } from "@angular/router";
//-----------------------------------------------------------------------
import { ApiService } from 'src/app/services/api.service';
//-----------------------------------------------------------------------


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  //constructor() { }

  //------------------------------------------------------
  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private router: Router,
  ) { }
  //------------------------------------------------------

  ngOnInit(): void {
  }

  //------------------------------------------------------
  userRole = this.api.userRole;
  //------------------------------------------------------

  /**
  * openLogin()
  *
  * Funcion que permite abrir el modal del login
  */
   public openLogin() {
    // abrimos el modal
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '400px',
        data: {},
        panelClass: 'custom-modalbox'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.userRole = this.api.userRole;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['landing']);
      }); 
      });
  }

  /**
  * openRegister()
  *
  * Funcion que permite abrir el modal de registro
  */
   public openRegister() {
    // abrimos el modal
      const dialogRef = this.dialog.open(SignUpComponent, {
        width: '400px',
        data: {},
        panelClass: 'custom-modalbox'
      });

      dialogRef.afterClosed().subscribe(result => {
        
      });
  }

  /**
  * signOff()
  *
  * Funcion que permite cerrar sesión cambiando el tipo de usuario y mostrando el landing correspondiente.
  */
  public signOff() {
    this.api.changeRole();
    this.userRole = this.api.userRole;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['landing']);
  }); 
  }
}
