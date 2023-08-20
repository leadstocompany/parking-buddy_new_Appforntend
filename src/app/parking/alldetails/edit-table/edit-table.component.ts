import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { EditPricingComponent } from './edit-pricing/edit-pricing.component';
import { EditBlackoutsComponent } from './edit-blackouts/edit-blackouts.component';
import { EditAmenitiesComponent } from './edit-amenities/edit-amenities.component';
import { EditDescriptionsComponent } from './edit-descriptions/edit-descriptions.component';
import { EditImageComponent } from './edit-image/edit-image.component';
import { EditNotificationsComponent } from './edit-notifications/edit-notifications.component';
import { EditBarcodesComponent } from './edit-barcodes/edit-barcodes.component';
import { EditTaxesAndFessComponent } from './edit-taxes-and-fess/edit-taxes-and-fess.component';


@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent {

  public routingOption: Array<{ name: string, component: any }> = [
    {
      name: 'Details',
      component: EditDetailsComponent
    }, {
      name: 'Products',
      component: EditProductsComponent
    }, {
      name: 'Pricing',
      component: EditPricingComponent
    }, {
      name: 'Blackouts',
      component: EditBlackoutsComponent
    }, {
      name: 'TaxesAndFees',
      component: EditTaxesAndFessComponent
    }, {
      name: 'Amenities',
      component: EditAmenitiesComponent
    }, {
      name: 'Descriptions',
      component: EditDescriptionsComponent

    }, {
      name: 'Images',
      component: EditImageComponent
    },
    {
      name: 'Notifications',
      component: EditNotificationsComponent
    },
    {
      name: 'Barcodes',
      component: EditBarcodesComponent
    }
  ]

  constructor(
    private dialogRef: MatDialogRef<EditTableComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    console.log(this.data, 'data')
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }

  openDialog(component: any) {
    const dialogRef = this._dialog.open(component.component, {
      height: '80vh',
      width: '90vw',
      data: { id: this.data.id },
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log(`Dialog result:`);
    });
  }
}
