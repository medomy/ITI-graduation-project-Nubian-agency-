import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, VERSION } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Alert } from 'src/app/core/models/alert/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs-compat/Observable';
import { DocumentData } from '@firebase/firestore';

@Component({
  selector: 'app-admin-categeories-update',
  templateUrl: './admin-categeories-update.component.html',
  styleUrls: ['./admin-categeories-update.component.css'],
})
export class AdminCategeoriesUpdateComponent implements OnInit {
  percentDone: number;
  uploadSuccess: boolean = false;
  addSuccess: boolean = false;
  alerts: Alert[] = [
    {
      type: 'success',
      message: 'Categeory updated success',
    },
  ];
  currentCategeory;
  selectedFiles;
  name = '';
  img = '';

  constructor(
    private http: HttpClient,
    private uploadService: StorageService,
    private CategoriesService: CategoriesService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.router.params.subscribe((param) => {
      this.CategoriesService.getOneCategory(param.id).subscribe((data) => {
        // console.log(data);
        this.currentCategeory = data;
        this.name = data.name;

        this.img = data.images;
        console.log(this.currentCategeory);
      });
    });
  }

  version = VERSION;

  updateCategory(data) {
    console.log(data);
    if (!this.selectedFiles) {
      this.CategoriesService.updateCategory(data.id, {
        name: data.name,
        updated_at: new Date().toDateString(),
      }).then(() => {
        this.addSuccess = true;
        setTimeout(() => {
          this.route.navigate(['/admin/categeories']);
        }, 1000);
      });
    } else if (this.selectedFiles && this.uploadSuccess) {
      this.uploadService
        .upload(
          'images/categeories',
          this.selectedFiles[0].name,
          this.selectedFiles[0]
        )

        .then((data2) => {
          this.CategoriesService.updateCategory(data.id, {
            image: data2,
            name: this.name,
            updated_at: new Date().toDateString(),
          });
        })

        .then(() => {
          this.addSuccess = true;
          setTimeout(() => {
            this.route.navigate(['/admin/categeories']);
          }, 1000);
        });
    }
  }

  upload(files: File[]) {
    this.uploadAndProgress(files);
    this.selectedFiles = files;
    console.log(this.selectedFiles[0]);
  }

  uploadAndProgress(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach((f) => formData.append('file', f));

    this.http
      .post('https://file.io', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(files);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }

  ngOnInit(): void {}
}
