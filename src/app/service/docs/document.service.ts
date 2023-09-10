import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public orderSummary: TDocumentDefinitions | undefined;

  constructor() {
    // pdfMake.fonts = {
    //   'ARIAL': {
    //     'normal': `${window.location.origin}/assets/fonts/ARIAL.TTF`,
    //     'bold': `${window.location.origin}/assets/fonts/ARIALBD.TTF`,
    //     'italics': `${window.location.origin}/assets/fonts/ARIALI.TTF`
    //   }
    // }
  }

  public async generateOrderSummary(data: any): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      const image = await this.getBase64ImageFromURL(`${window.location.origin}/assets/signup.png` as string);
      let width = 0;
      let height = 0;
      const img = new Image()
      img.onload = () => {
        height = img.height;
        width = img.width;
      };
      this.orderSummary = {
        pageMargins: [30, 20, 30, 100],
        background: [
          {
            image: image as string,
            width: width,
            height:height,
            opacity:0.3,
          }
        ],
        content: [
          {
            text: 'Order Summary',
            style: {
              decoration: "underline",
              alignment: "center",
              bold: true,
              fontSize: 20
            },
            marginTop: 20,
            marginBottom: 30
          },
          {
            text: data.title,
            bold: true,
            fontSize: 15,
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Parking Type :',
                width: "20%",
              },
              {
                text: data.parkingType,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Check-In :',
                width: "20%",
              },
              {
                text: data.checkIN,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Check-Out :',
                width: "20%",
              },
              {
                text: data.checkOut,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Total Days:',
                width: "20%",
              },
              {
                text: data.days,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Subtotal :',
                width: "20%",
              },
              {
                text: data.subTotal,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Service Charge :',
                width: "20%",
              },
              {
                text: data.serviceCharge,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Taxes & Fees :',
                width: "20%",
              },
              {
                text: data.taxes,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
          {
            columns: [
              {
                text: 'Total :',
                width: "20%",
              },
              {
                text: data.total,
                width: "80%",
              }
            ],
            marginBottom: 10
          },
        ]
      }
      if (data.download == true) {
        pdfMake.createPdf(this.orderSummary).download('orderSummary.pdf');
      }
      resolve(true)
    })
  }

  public async getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

}
