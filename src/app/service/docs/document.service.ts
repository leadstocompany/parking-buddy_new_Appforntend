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

  public async generateOrderSummary(data: any, download: any, icon: any): Promise<boolean> {
    console.log(data, 'error')
    return new Promise(async (resolve, reject) => {
      // const image = await this.getBase64ImageFromURL(`${window.location.origin}/assets/signup.png` as string);
      // let width = 0;
      // let height = 0;
      // const img = new Image()
      // img.onload = () => {
      //   height = img.height;
      //   width = img.width;
      // };
      this.orderSummary = {
        pageMargins: [30, 20, 30, 100],
        // background: [
        //   {
        //     image: image as string,
        //     width: width,
        //     height:height,
        //     opacity:0.3,
        //   }
        // ],
        content: [
          {
            columns: [
              {
                stack: [
                  {
                    text: 'Parking Spotters',
                  },
                ],
                color: '#4C3F9C',
                width: '50%'
              },
              {
                stack: [
                  {
                    text: `Reservation ID: 1250802`
                  },
                  {
                    text: `Transaction ID: 1250802`
                  }
                ],
                width: '80%',
                alignment: 'right',
              }
            ]
          },
          {
            text: `Hey, ${data?.guest_email}`,
            marginTop: 30,
            marginLeft: 20
          },
          {
            text: `Your parking has been confirmed and the ${data?.property?.tittle} is expecting you on ${data?.check_in_date}`,
            marginLeft: 20,
            marginBottom: 30,
            marginTop: 10
          },
          {
            columns: [
              {
                stack: [
                  {
                    text: 'Parking Location Information',
                    color: '#352A7E',
                    style: {
                      bold: true,
                      fontSize: 20
                    },
                    marginTop: 5
                  },
                  {
                    text: data?.property?.tittle,
                    marginTop: 5
                  },
                  {
                    text: `${data?.property?.street}`,
                    marginTop: 5
                  },
                  {
                    text: `${data?.property?.city}, ${data?.property?.state}, ${data?.property?.country}, ${data?.property?.zipcode}`,
                    marginTop: 5
                  },
                  {
                    text: [
                      {
                        text: 'Driving Directions : ',
                        style: {
                          bold: true
                        }
                      },
                      {
                        text: ' Visit Google Map',
                        link: `https://www.google.com/maps/dir/?api=1&destination=${data?.property?.latitude},${data?.property?.longitude}`,
                        style: {
                          color: '#352A7E',
                          fontSize: 15,
                        },
                        target: '_blank'
                      }
                    ],
                    marginTop: 30
                  },
                  // {
                  //   text: 'Enter this location at :',
                  //   marginTop: 30
                  // },
                  // {
                  //   text: 'xxxxx',
                  //   marginTop: 5
                  // },
                  // {
                  //   text: 'Entrance address for the Lot',
                  //   marginTop: 30
                  // },
                  // {
                  //   text: 'xxxxx',
                  //   marginTop: 5
                  // }
                ],
                width: '50%'
              },
              {
                stack: [
                  {
                    text: 'Booking Details',
                    color: '#352A7E'
                  },
                  {
                    columns: [
                      {
                        text: 'Person Parking',
                        width: '40%'
                      },
                      {
                        text: `: ${data?.user?.first_name ? data?.user?.first_name : '-'} ${data?.user?.last_name ? data?.user?.last_name : '-'}`,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'Parking Type',
                        width: '40%'
                      },
                      {
                        text: `: ${data?.parking_type?.type}`,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  // {
                  //   columns: [
                  //     {
                  //       text: 'Parking Spaces',
                  //       width: '40%'
                  //     },
                  //     {
                  //       text: `: Parking Spaces`,
                  //       width: '60%'
                  //     },
                  //   ],
                  //   marginTop: 5
                  // },
                  {
                    columns: [
                      {
                        text: 'Check In',
                        width: '40%'
                      },
                      {
                        text: `: ${data?.check_in_date} - ${data?.check_in_time}`,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'Check Out',
                        width: '40%'
                      },
                      {
                        text: `: ${data?.check_out_date} - ${data?.check_out_time}`,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'Days of parking',
                        width: '40%'
                      },
                      {
                        text: `: ${data?.no_of_days == null ? 0 : data?.no_of_days}`,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'License Plate',
                        width: '40%'
                      },
                      {
                        text: `: ${data?.user?.car_plate_no ? data?.user?.car_plate_no : '-'}`,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  // {
                  //   columns: [
                  //     {
                  //       text: 'Car Make',
                  //       width: '40%'
                  //     },
                  //     {
                  //       text: `: ${data?.user?.car_model ? data?.user?.car_model : '-'}`,
                  //       width: '60%'
                  //     },
                  //   ],
                  //   marginTop: 5
                  // },
                ]
              }
            ]
          },
          {
            columns: [
              {
                stack: [
                  {
                    text: 'Shuttle Pickup',
                    color: '#352A7E',
                    style: {
                      bold: true,
                      fontSize: 20
                    },
                    marginTop: 120
                  },
                  {
                    columns: [
                      {
                        text: 'Phone Number',
                        width: '40%'
                      },
                      {
                        text: data?.property?.shuttle_phone_number,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'Shuttle hours',
                        width: '40%'
                      },
                      {
                        stack: [
                          {
                            text: `${data['shuttle_hours-open_time'] ? data['shuttle_hours-open_time'] : '-'} - ${data['shuttle_hours-close_time'] ? data['shuttle_hours-close_time'] : '-'} `,
                          },
                          {
                            text: `Shuttle runs every ${15 > 24 ? 'hours' : 'minutes'}.`
                          }
                        ],
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'No shuttle',
                        width: '40%'
                      },
                      {
                        text: `${data['no_shuttle_open-time'] ? data['no_shuttle_open-time'] : '-'} - ${data['no_shuttle_close-time'] ? data['no_shuttle_close-time'] : '-'}`,
                        width: '60%'
                      },
                    ],
                    marginTop: 5
                  },
                ],
                width: '50%'
              },
              {
                stack: [
                  {
                    text: 'Payment Breakdown',
                    color: '#352A7E',
                    style: {
                      bold: true,
                      fontSize: 20
                    },
                  },
                  {
                    text: 'Parking Price',
                    marginTop: 10
                  },
                  {
                    columns: [
                      {
                        text: `(${data?.no_of_days == null ? 0 : data?.no_of_days} Days of parking)`,
                        width: '60%'
                      },
                      {
                        text: `${icon} ${data?.base_price == null ? 0 : data?.base_price}`,
                        width: '40%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'Service Charge',
                        width: '60%'
                      },
                      {
                        text: `${icon} ${data?.service_charge == null ? 0 : data?.service_charge}`,
                        width: '40%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'Lot Taxes & Fees',
                        width: '60%'
                      },
                      {
                        text: `${icon} ${data?.taxesandfees == null ? 0 : data?.taxesandfees}`,
                        width: '40%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'Total',
                        bold: true,
                        width: '60%'
                      },
                      {
                        text: `${icon} ${((data?.base_price == null ? 0.1 : +data?.base_price) + (data?.service_charge == null ? 0.10 : +data?.service_charge) + (data?.taxesandfees == null ? 0.001 : +data?.taxesandfees))}`,
                        bold: true,
                        width: '40%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'You Paid',
                        width: '60%'
                      },
                      {
                        text: `${icon} ${data?.amount}`,
                        width: '40%'
                      },
                    ],
                    marginTop: 30
                  },
                  {
                    columns: [
                      {
                        text: 'Remaining Due',
                        bold: true,
                        width: '60%'
                      },
                      {
                        text: '',
                        width: '40%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    columns: [
                      {
                        text: 'At Parking Lot',
                        bold: true,
                        width: '60%'
                      },
                      {
                        text: `${icon} ${Math.abs((((data?.base_price == null ? 0 : data?.base_price) + (data?.service_charge == null ? 0 : data?.service_charge) + data?.taxesandfees == null ? 0 : data?.taxesandfees)) - data?.amount)}`,
                        bold: true,
                        width: '40%'
                      },
                    ],
                    marginTop: 5
                  },
                  {
                    text: '*Lot Taxes & Fees Include the Following',
                    marginTop: 30,
                    fontSize: 8
                  },
                  {
                    text: 'Fuel Surcharge ₹1.95 INR',
                    marginTop: 5,
                    fontSize: 8
                  },
                  {
                    text: 'State Tax ₹8.45 INR',
                    marginTop: 5,
                    fontSize: 8
                  }
                ],
                width: '50%'
              }
            ]
          },
          {
            text: 'Thank you for trusting us with your business.',
            style: {
              bold: true,
              fontSize: 20
            },
            marginTop: 30,
            marginBottom: 10
          },
          {
            text: `Your credit card has successfully been charged ${icon} ${data?.amount} A copy of your reservation is also in Your Account.`,
            marginBottom: 20
          },
          {
            text: 'You can view or cancel your reservation at https:l/parkingspotters.com',
            marginBottom: 20
          },
          {
            text: 'This facility does NOT allow in/out privileges. You CANNOT enter & exit more than once',
            marginBottom: 20
          },
          {
            text: `Estimated oversize fee of ₹15 daily for vehicles between 65" and 75" in height and over 180" in length, or any vehicle taller than 75''. These fees are to be paid directly to the parking LOT ( From Lot MASTER )`,
            marginBottom: 20
          },
          {
            text: `You may have been asked to complete a survey regarding your purchase experience at upon completing your reservation online; we would like to thank you for your feedback. This helps us Improve our service and better serve you in the future.`,
            marginBottom: 10
          },
          {
            text: `You may be asked to complete a survey regarding your parking experience after returning from your trip or event. Please keep in mind that this survey is specific to the lot in which you parked and not In regard to your booking experience. Parkway Spotters does not own or operate the individual parking faculties.`,
            marginBottom: 10
          },
        ]
      }
      if (download == true) {
        console.log('==>');

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
