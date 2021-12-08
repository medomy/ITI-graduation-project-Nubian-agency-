import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
import { ArtistService } from 'src/app/core/services/Artist/artist.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ToastsService } from 'src/app/admin/services/toasts.service';

@Component({
  selector: 'app-admin-service-update',
  templateUrl: './admin-service-update.component.html',
  styleUrls: ['./admin-service-update.component.css'],
})
export class AdminServiceUpdateComponent implements OnInit, OnChanges {
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
  categeories;
  artists;
  currentProduct;
  currentArtist;
  currentCategeory;
  isLoading: boolean = false;
  serviceForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30),
    ]),
    size: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(100)]),
    artist: new FormControl(''),
    category: new FormControl(''),
    mainImg: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    private uploadService: StorageService,
    private categoriesService: CategoriesService,
    private artistService: ArtistService,
    private productService: ProductsService,
    private router: ActivatedRoute,
    private route: Router,
    public toastService: ToastsService
  ) {
    this.router.params.subscribe(async (param) => {
      await this.productService
        .getOneProduct(param.id)
        .subscribe(async (data) => {
          // console.log(data);
          this.currentProduct = await data;

          await this.categoriesService
            .getOneCategory(data.categoryID)
            .subscribe(async (data) => {
              this.currentCategeory = await data;
            });
          await this.artistService
            .getOneArtist(data.artistID)
            .subscribe(async (data) => {
              this.currentArtist = await data;
            });

          if (
            this.currentProduct &&
            this.currentCategeory &&
            this.currentArtist
          ) {
            this.isLoading = true;
          } else {
            this.isLoading = false;
          }
        });
    });

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
    return this.serviceForm.get('title');
  }
  get description() {
    return this.serviceForm.get('description');
  }
  get size() {
    return this.serviceForm.get('size');
  }
  get price() {
    return this.serviceForm.get('price');
  }
  get artist() {
    return this.serviceForm.get('artist');
  }
  get category() {
    return this.serviceForm.get('category');
  }
  get mainImg() {
    return this.serviceForm.get('mainImg');
  }
  updateService() {
    if (!this.selectedFiles && this.serviceForm.valid) {
      this.productService
        .updateProduct(this.currentProduct.id, {
          title: this.title.value,
          description: this.description.value,
          size: this.size.value ? this.size.value : '',
          price: this.price.value,
          artistID: this.artist.value,
          categoryID: this.category.value,
          TimeStamp: {
            updatedAt: new Date().toDateString(),
          },
        })
        .then(() => {
          this.addSuccess = true;
          setTimeout(() => {
            this.route.navigate(['/admin/services']);
          }, 1000);
        });
    } else if (this.selectedFiles) {
      this.uploadService
        .upload(
          'images/services',
          this.selectedFiles[0].name,
          this.selectedFiles[0]
        )
        .then((data) => {
          if (data && this.uploadSuccess && this.serviceForm.valid) {
            this.productService
              .updateProduct(this.currentProduct.id, {
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
                setTimeout(() => {
                  this.route.navigate(['/admin/services']);
                }, 1000);
              });
          }
        });
    }
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
  ngOnChanges(): void {}

  showSuccess() {
    this.toastService.show('Update success ', {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }
}
