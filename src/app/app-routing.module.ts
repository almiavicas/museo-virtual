import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VirtualMuseumComponent } from './virtual-museum/virtual-museum.component';
import { LandingComponent } from './views/landing/landing.component';
import { TourDetailsComponent } from './views/tour-details/tour-details.component';
import { ToolCreatorComponent } from './tool-creator/tool-creator.component';
import { AddMuseumComponent} from './views/add-museum/add-museum.component';


const routes: Routes = [
  {
    path: 'admin/:id',
    component: TourDetailsComponent,
    data: {toolbar:true},
  },
  {
    path: 'admin',
    component: VirtualMuseumComponent,
    data: {toolbar:false},
  },
  {
    path: 'tool-creator',
    component: ToolCreatorComponent,
    data: {toolbar:true},
  },
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
    data: {toolbar:true},
  },
  {
    path: 'landing',
    component: LandingComponent,
    pathMatch: 'full',
    data: {toolbar:true},
  },
  {
    path: 'add-museum',
    component: AddMuseumComponent,
    data: {toolbar:true},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
