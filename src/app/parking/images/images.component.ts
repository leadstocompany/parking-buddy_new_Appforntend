import { Component } from '@angular/core';
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
    if (this.selectedFiles.length > 0) {
      console.log('Uploading images:', this.selectedFiles);
      console.log('uploading logo', this.logo)
      this.selectedFiles = [];
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

