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
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/core/services/Artist/artist.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ToastsService } from 'src/app/admin/services/toasts.service';

@Component({
  selector: 'app-admin-service-add',
  templateUrl: './admin-service-add.component.html',
  styleUrls: ['./admin-service-add.component.css'],
})
export class AdminServiceAddComponent implements OnInit {
  percentDone: number;
  uploadSuccess: boolean = false;
  addSuccess: boolean = false;

  selectedFiles;
  categeories;
  artists;

  service = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30),
    ]),
    size: new FormControl('', [Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(100)]),
    artist: new FormControl(''),
    category: new FormControl(''),
    mainImg: new FormControl('', Validators.required),
    // subImg1: new FormControl('', Validators.required),
    // subImg2: new FormControl('', Validators.required),
    // subImg3: new FormControl('', Validators.required),
  });

  data;
  // _subimg1;
  // _subimg2;
  // _subimg3;

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

    this.artists = this.artistService.getArtists().subscribe(async (data) => {
      this.artists = await data;
    });
  }

  version = VERSION;

  get title() {
    return this.service.get('title');
  }
  get description() {
    return this.service.get('description');
  }
  get size() {
    return this.service.get('size');
  }
  get price() {
    return this.service.get('price');
  }
  get artist() {
    return this.service.get('artist');
  }
  get category() {
    return this.service.get('category');
  }
  get mainImg() {
    return this.service.get('mainImg');
  }
  // get subImg1() {
  //   return this.service.get('subImg1');
  // }
  // get subImg2() {
  //   return this.service.get('subImg2');
  // }
  // get subImg3() {
  //   return this.service.get('subImg3');
  // }

  addService() {
    console.log(this.service.value);
    console.log(this.selectedFiles);
    this.uploadService
      .upload(
        'images/services',
        this.selectedFiles[0].name,
        this.selectedFiles[0]
      )
      .then((data) => {
        if (
          data &&
          this.selectedFiles &&
          this.uploadSuccess &&
          this.service.valid
        ) {
          this.productService
            .addProduct({
              title: this.title.value,
              description: this.description.value,
              size: this.size.value ? this.size.value : '',
              price: this.price.value,
              images: {
                mainImage: data,
                subImages: [data, data, data],
              },
              artistID: this.artist.value,
              categoryID: this.category.value,
              TimeStamp: {
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString(),
                removedAt: null,
              },
            })
            .then(() => {
              this.addSuccess = true;
                              this.route.navigate(['/admin/services']);

              // setTimeout(() => {
              //   this.route.navigate(['/admin/services']);
              // }, 500);


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
    this.toastService.show('Add success ', {
      classname: 'bg-success text-light',
     
    });
  }
}
