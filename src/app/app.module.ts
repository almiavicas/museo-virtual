import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VirtualMuseumComponent } from './virtual-museum/virtual-museum.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { CanvasComponent } from './virtual-museum/canvas/canvas.component';
import { VirtualViewComponent } from './virtual-museum/virtual-view/virtual-view.component';
import { LandingComponent } from './views/landing/landing.component';
import { TourDetailsComponent } from './views/tour-details/tour-details.component';
import { UploadImageComponent } from './components/dialogs/upload-image/upload-image.component';
import { ToolCreatorComponent } from './tool-creator/tool-creator.component';
import { ModalComponent } from './virtual-museum/modal/modal.component';
// import { DeleteMuseumComponent } from './components/delete-museum/delete-museum.component';
import { AddMuseumComponent } from './views/add-museum/add-museum.component';
import { DeleteComponent } from './components/dialogs/delete/delete.component';
import { ArtifactDetailsComponent } from './components/dialogs/artifact-details/artifact-details.component';
import { RemoveHotspotComponent } from './tool-creator/remove-hotspot/remove-hotspot.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ModalMinimapComponent } from './tool-creator/modal_minimap/modal_minimap.component';
import { CanvasMinimapaComponent } from './tool-creator/canvas_minimapa/canvas_minimapa.component';
import { MsgErrorComponent } from './tool-creator/msg-error/msg-error.component';
import { RemovePinsComponent } from './tool-creator/remove_pins/remove_pins.component';
import { LoginComponent,DialogErrorLogin } from './toolbar/login/login.component';
import { SignUpComponent,DialogErrorSignUp, DialogSuccessSignUp } from './toolbar/signUp/signUp.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    VirtualMuseumComponent,
    CanvasComponent,
    CanvasMinimapaComponent,
    VirtualViewComponent,
    LandingComponent,
    TourDetailsComponent,
    UploadImageComponent,
    ToolCreatorComponent,
    ModalComponent,
    // DeleteMuseumComponent,
    AddMuseumComponent,
    DeleteComponent,
    ArtifactDetailsComponent,
    RemoveHotspotComponent,
    ModalMinimapComponent,
    RemovePinsComponent,
    MsgErrorComponent,
    LoginComponent,
    DialogErrorLogin,
    SignUpComponent,
    DialogErrorSignUp,
    DialogSuccessSignUp,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    UploadImageComponent,
    DeleteComponent,
    ArtifactDetailsComponent,
    ModalComponent,
    RemoveHotspotComponent,
    ModalMinimapComponent,
    RemovePinsComponent,
    LoginComponent,
    DialogErrorLogin,
    SignUpComponent,
    DialogSuccessSignUp,
    DialogErrorSignUp,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }