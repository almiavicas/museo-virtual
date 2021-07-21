import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { ArtifactDetailsComponent } from 'src/app/components/dialogs/artifact-details/artifact-details.component';
import { DeleteComponent } from 'src/app/components/dialogs/delete/delete.component';
import { UploadImageComponent } from 'src/app/components/dialogs/upload-image/upload-image.component';
import { Artifact } from 'src/app/models/artifact.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss']
})
export class TourDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  museum = {
    id: '1',
    title: 'Museo Larco',
    location: 'Ciudad, Pais',
    featuredImage: 'https://i.pinimg.com/originals/6d/31/de/6d31dea85fc4a2167ec4b6d4f21778fb.jpg',
    createdAt: new Date(),
    description: 'Descripcion del museo.'
  };
  museumViews = [
    this.museum.featuredImage,
    this.museum.featuredImage,
    this.museum.featuredImage,
    this.museum.featuredImage,
  ];
  museumRooms: string[];
  editMode = false;
  museumArtifacts: Artifact[];


  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  obs: Observable<any>;
  matCardDataSource: MatTableDataSource<Artifact> = new MatTableDataSource<Artifact>([]);
  matTableDataSource = new MatTableDataSource<Artifact>([]);
  //artifactPageEvent: PageEvent;

  displayedColumns = [
    'id',
    'artifactLabel',
    'labelMaterial',
    'labelLocation',
    'labelCreator',
    'note',
  ];

  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private museumId: string;
  dialogRef: any;
  private museumSub: Subscription;
  private artifactsSub: Subscription;
  private paramsSub: Subscription;
  private dialogSub: Subscription;
  breakpoint: number;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {

    this.paramsSub = this.route.params.subscribe(params => {
      this.museumId = params.id;
      if (!this.museumId) this.router.navigateByUrl('/');
      this.museum.title = this.museumId;

      this.artifactsSub = this.api.getMuseumArtifacts(this.museumId).subscribe((response) => {
        this.museumArtifacts = [...response.result];
        this.matTableDataSource.data = this.museumArtifacts;
        this.matCardDataSource.data = this.museumArtifacts;
      }, console.error);

      this.museumSub = this.api.getMuseumDetails(this.museumId).subscribe((response) => {
        this.museumRooms = [...response.rooms];
      }, console.error);
    }, console.error);


    // Paginator para las cartas de los artefactos/obras:
    this.changeDetectorRef.detectChanges();
    this.matCardDataSource.paginator = this.paginator.toArray()[0];
    this.obs = this.matCardDataSource.connect();

    // Window breakpoints para los grid-list:
    if (window.innerWidth <= 900) this.breakpoint = 1;
    if (window.innerWidth > 900 && window.innerWidth <= 1200) this.breakpoint = 2;
    if (window.innerWidth > 1200) this.breakpoint = 3;

    window.scrollTo(0, 0);
  }


  /**
    * getArtifactImage
    *
    * Busca la ruta de la imagen del artefacto dado
    * @param artifactId id del artefacto
    * @returns url de la imagen del artefacto
    */
  public getArtifactImage(artifactId: string){
    return this.api.getArtifactImage(artifactId);
  }

  /**
    * onResize
    * Window breakpoints para los grid-list
    */
  onResize(event){
    if (window.innerWidth <= 900) this.breakpoint = 1;
    if (window.innerWidth > 900 && window.innerWidth <= 1200) this.breakpoint = 2;
    if (window.innerWidth > 1200) this.breakpoint = 3;
  }



  //---------------------------------------------------------------
  userRole = this.api.userRole;
  //---------------------------------------------------------------




  ngOnDestroy(): void {
    if (this.paramsSub) this.paramsSub.unsubscribe();
    if (this.dialogSub) this.dialogSub.unsubscribe();
    if (this.artifactsSub) this.artifactsSub.unsubscribe();
    if (this.museumSub) this.museumSub.unsubscribe();
    if (this.matCardDataSource) this.matCardDataSource.disconnect();
  }

  ngAfterViewInit(): void {
    this.matTableDataSource.paginator = this.paginator.toArray()[0];
  }

  openUploadImageDialog = (): void => {
    // Prevent duplicated dialogs
    if (this.dialogSub) this.dialogSub.unsubscribe();
    if (this.dialogRef) this.dialogRef.close();
    // Open dialog
    this.dialogRef = this.dialog.open(UploadImageComponent, {
      width: '350px',
      height: '200px',
      data: { fileUrl: null },
    });
    this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  };

  openDeleteDialog = (): void => {
    // Prevent duplicated dialogs
    if (this.dialogSub) this.dialogSub.unsubscribe();
    if (this.dialogRef) this.dialogRef.close();
    // Open dialog
    this.dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      height: '250px',
      data: { title: this.museum.title }
    });
    this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  };

  openArtifactDialog = (artifact: Artifact): void => {
    // Prevent duplicated dialogs
    if (this.dialogSub) this.dialogSub.unsubscribe();
    if (this.dialogRef) this.dialogRef.close();
    // Open dialog
    this.dialogRef = this.dialog.open(ArtifactDetailsComponent, {
      width: '450px',
      height: '550px',
      data: { artifact },
    });
    this.dialogSub = this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  };

  toggleEditMode = (): void => {
    this.editMode = !this.editMode;
  }

  saveChanges = (): void => {
    console.log('saving changes', this.museum);
    this.toggleEditMode();
  }


  /**
    * syncPrimaryPaginator
    * Sincroniza el paginator que aparece arriba de las obras, con el paginator de abajo
    */
  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.toArray()[0].pageIndex = event.pageIndex;
    this.paginator.toArray()[0].pageSize = event.pageSize;
    this.paginator.toArray()[0].page.emit(event);
  }
}
