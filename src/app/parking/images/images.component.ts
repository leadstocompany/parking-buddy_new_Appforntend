import { Component } from '@angular/core';
import { ImagesService } from 'src/app/service/images.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
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
  editData: any;
  constructor(private _saveService: SaveidService, private _imageService: ImagesService, private _snackbarService: SnackbarService) { }

  ngOnInit() {
    // Check edit or not 
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getImages(this.editData.id)
    } else if (this.editData.edit === false && this._saveService.getPropertyId()) {
      this.getImages(this._saveService.getPropertyId())
    }
  }

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
      this.spinner = true
      const data = {
        "logo": this.logo,
        "images": this.selectedFiles,
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      }
      this._imageService.createImages(data).subscribe({
        next: (res) => {
          console.log(res)
          this.spinner = false
          this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
          this.selectedFiles = [];
          this.removeLogo()
          if(this.editData.edit){
            this.getImages(this.editData.id)
          }else{
            this.getImages(this._saveService.getPropertyId())
          }
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


  getImages(id: any) {
    this._imageService.getIMages(id).subscribe({
      next: (res) => {
        console.log(res)
        if (res.length) {
          this.setLogo(res[0].logo)
          this._imageService.getAllIMages(res[0].id).subscribe({
            next: (res) => {
              console.log(res, 'images-----------')
              this.selectedFiles = res.map((item: any, i: any) => ({
                // You can customize how the 'icon' value is created
                file: i,
                url: item.images,
              }));
            },
            error: (error) => {
              console.log(error)
            }
          })
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  setLogo(img: any) {
    this.logo = {
      file: '',
      url: img
    }
  }
}

