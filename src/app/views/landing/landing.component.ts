import { Component, OnInit } from '@angular/core';
import { MuseumOverview } from 'src/app/models/museum.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class LandingComponent implements OnInit {
  museums: MuseumOverview[];
  breakpoint: number;
  rowHeight: number;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getMuseums().subscribe((response) => {
      this.museums = [...response.result];
    }, console.error);

    // Window breakpoints para el grid-list (cartas de los museos):
    if (window.innerWidth <= 900) this.breakpoint = 1;
    if (window.innerWidth > 900 && window.innerWidth <= 1200) this.breakpoint = 2;
    if (window.innerWidth > 1200) this.breakpoint = 3;
    if (window.innerWidth <= 500) this.rowHeight = 550;
    if (window.innerWidth > 500) this.rowHeight = 450;

    window.scrollTo(0, 0);
  }

  /**
    * onResize
    * Window breakpoints para el grid-list (cartas de los museos)
    */
  onResize(event){
    if (window.innerWidth <= 900) this.breakpoint = 1;
    if (window.innerWidth > 900 && window.innerWidth <= 1200) this.breakpoint = 2;
    if (window.innerWidth > 1200) this.breakpoint = 3;
    if (window.innerWidth <= 500) this.rowHeight = 550;
    if (window.innerWidth > 500) this.rowHeight = 450;
  }

  //--------------------------------------------------------
  // variable para mostrar el landing correspondiente segun el tipo de usuario
  userRole = this.api.userRole;
  //--------------------------------------------------------
}
