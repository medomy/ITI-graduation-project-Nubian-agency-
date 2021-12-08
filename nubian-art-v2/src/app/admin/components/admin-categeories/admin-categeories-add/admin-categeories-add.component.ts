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
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/admin/services/toasts.service';

@Component({
  selector: 'app-admin-categeories-add',
  templateUrl: './admin-categeories-add.component.html',
  styleUrls: ['./admin-categeories-add.component.css'],
})
export class AdminCategeoriesAddComponent implements OnInit {
  percentDone: number;
  uploadSuccess: boolean = false;
  addSuccess: boolean = false;
  alerts: Alert[] = [
    {
      type: 'success',
      message: 'Categeory add success',
    },
  ];

  selectedFiles;
  category = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private uploadService: StorageService,
    private CategoriesService: CategoriesService,
    private route: Router,
    private toastService: ToastsService
  ) {}

  version = VERSION;

  get name() {
    return this.category.get('name');
  }

  addCategory() {
    this.uploadService
      .upload(
        'images/categeories',
        this.selectedFiles[0].name,
        this.selectedFiles[0]
      )
      .then((data) => {
        if (
          data &&
          this.selectedFiles &&
          this.uploadSuccess &&
          this.category.valid
        ) {
          this.CategoriesService.addCategory({
            created_at: new Date().toDateString(),
            image: data,
            name: this.name.value,
            removed_at: null,
            updated_at: new Date().toDateString(),
          }).then(() => {
            this.addSuccess = true;
            setTimeout(() => {
              this.route.navigate(['/admin/categeories']);
            }, 1000);
          });
        }
      });
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

  // this.uploadService.upload('imgs', Date.now().toString(), files[0]);

  ngOnInit(): void {}
  showSuccess() {
    this.toastService.show('Add success ', {
      classname: 'bg-success text-light',
      delay: 1500,
    });
  }
}
