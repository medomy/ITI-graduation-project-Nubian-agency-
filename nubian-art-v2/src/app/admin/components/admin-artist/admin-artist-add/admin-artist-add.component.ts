import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, VERSION } from '@angular/forms';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/core/services/Artist/artist.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ToastsService } from 'src/app/admin/services/toasts.service';
@Component({
  selector: 'app-admin-artist-add',
  templateUrl: './admin-artist-add.component.html',
  styleUrls: ['./admin-artist-add.component.css'],
})
export class AdminArtistAddComponent implements OnInit {
  percentDone: number;
  uploadSuccess: boolean = false;
  addSuccess: boolean = false;
  selectedFiles;
  categeories;

  aristForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    gender: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private uploadService: StorageService,
    private categoriesService: CategoriesService,
    private artistService: ArtistService,
    private productService: ProductsService,
    private route: Router,
    public toastService: ToastsService
  ) {
    this.categeories = this.categoriesService
      .getcategoriess()
      .subscribe(async (data) => {
        this.categeories = await data;
      });
  }

  version = VERSION;

  get name() {
    return this.aristForm.get('name');
  }
  get email() {
    return this.aristForm.get('email');
  }
  get country() {
    return this.aristForm.get('country');
  }
  get gender() {
    return this.aristForm.get('gender');
  }
  get date() {
    return this.aristForm.get('date');
  }
  get department() {
    return this.aristForm.get('department');
  }

  addArtist() {
    console.log(this.aristForm.value);
    console.log(this.selectedFiles);
    this.uploadService
      .upload(
        'images/arists',
        this.selectedFiles[0].name,
        this.selectedFiles[0]
      )
      .then((data) => {
        if (
          data &&
          this.selectedFiles &&
          this.uploadSuccess &&
          this.aristForm.valid
        ) {
          this.artistService
            .addArtist({
              name: this.name.value,
              dateOfBirth: this.date.value,
              country: this.country.value,
              email: this.email.value,
              gender: this.gender.value,
              department: this.department.value,
              avatar: data,
              TimeStamp: {
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString(),
                removedAt: null,
              },
            })
            .then(() => {
              this.addSuccess = true;
              setTimeout(() => {
                this.route.navigate(['/admin/artists']);
              }, 1000);
            });
        }
      });
  }

  upload(files: File[]) {
    this.uploadAndProgress(files);
    this.selectedFiles = files;
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

  showSuccess() {
    this.toastService.show('Add success wait..', {
      classname: 'bg-success text-light',
      delay: 1000,
    });
  }
}
