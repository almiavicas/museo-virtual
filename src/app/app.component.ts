import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'museum';


  constructor(
  	private router:Router,
  	private activatedRoute:ActivatedRoute
  ){}

  // showToolbar: Indica si el toolbar se debe mostrar para una ruta dada
  showToolbar:boolean = false;

  ngOnInit() {
  	this.router.events.pipe(
  		filter(events => events instanceof NavigationEnd),
  		map(evt => this.activatedRoute),
  		map(route => {
  			while (route.firstChild) {
  				route = route.firstChild;
  			}
  			return route;
  		})
  	)
  	.pipe(
  		filter(route => route.outlet === 'primary'),
  		mergeMap(route => route.data)
  	).subscribe(x => x.toolbar===true ?
  	this.showToolbar=true : this.showToolbar=false)
  }
}
