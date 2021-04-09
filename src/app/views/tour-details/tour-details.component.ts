import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteComponent } from 'src/app/components/dialogs/delete/delete.component';
import { UploadImageComponent } from 'src/app/components/dialogs/upload-image/upload-image.component';
import { Artifact } from 'src/app/models/artifact.model';
import { MuseumOverview } from 'src/app/models/museum.model';
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
  editMode = false;
  museumArtifacts: Artifact[];
  matTableDataSource = new MatTableDataSource<Artifact>([]);
  artifactPageEvent: PageEvent;
  displayedColumns = ['labelArtifact', 'labelMaterial', 'labelCreator', 'note',];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private museumId: string;
  private paramsSub: Subscription;
  dialogRef: any;
  private dialogSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.museumId = params.id;
      if (!this.museumId) this.router.navigateByUrl('/');
      this.museum.title = this.museumId;
      this.api.getMuseumDetails(this.museumId).subscribe((response) => {
        this.museumArtifacts = [...response.result];
        this.museumArtifacts.forEach(artifact => {
          if (artifact.note.length > 100) artifact.note = artifact.note.substring(0, 100) + '...';
        });
        this.matTableDataSource.data = this.museumArtifacts;
      }, console.error);
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSub) this.paramsSub.unsubscribe();
    if (this.dialogSub) this.dialogSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.matTableDataSource.paginator = this.paginator;
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

  toggleEditMode = (): void => {
    this.editMode = !this.editMode;
  }

  saveChanges = (): void => {
    console.log('saving changes', this.museum);
    this.toggleEditMode();
  }


}
