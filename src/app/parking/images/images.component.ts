import { Component } from '@angular/core';
import { ImagesService } from 'src/app/service/images.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
interface SelectedFile {
  file: File | string;
  url: any;
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})

export class ImagesComponent {
  selectedFiles: SelectedFile[] = [
    {
      file: 'image1',
      url: 'https://th.bing.com/th/id/OIP.kaXSSXhvLQ-2IykY5N7qrAHaFa?pid=ImgDet&rs=1'
    },
    {
      file: 'image2',
      url: 'https://jooinn.com/images/parking-lot-7.jpg'
    },
    {
      file: 'image3',
      url: 'https://landuse.coxcastle.com/files/2017/01/Parking-Lot.jpeg'
    },
  ];
  logo: SelectedFile = {
    file: '',
    url: ''
  }
  spinner = false

  constructor(private _imageService: ImagesService, private _snackbarService: SnackbarService) { }

  onFilesSelected(event: any) {
    this.selectedFiles = [];
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i] as File;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles.push({ file, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onLogoSelected(event: any) {
    const files = event.target.files;
    const file = files[0] as File;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logo = { file, url: e.target.result };
    };
    reader.readAsDataURL(file);
  }

  uploadImages() {
    if (this.selectedFiles.length > 0 && this.logo.url) {
      // console.log('Uploading images:', this.selectedFiles);
      // console.log('uploading logo', this.logo)
      this.spinner = true
      const data = {
        "logo": this.logo,
        "images": this.selectedFiles,
        "property": localStorage.getItem('detailsId')
      }
      this._imageService.createImages(data).subscribe({
        next: (res) => {
          console.log(res)
          this.spinner = false
          this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
          this.selectedFiles = [];
          this.removeLogo()
        },
        error: (error) => {
          console.log(error)
          this._snackbarService.openSnackbar('❌ Internal Server Error')
          this.spinner = false
        }
      })
    } else {
      this._snackbarService.openSnackbar('Please Select both Images and Logo')
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  removeLogo() {
    this.logo = {
      file: '',
      url: ''
    }
  }

}

