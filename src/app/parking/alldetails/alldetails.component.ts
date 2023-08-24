import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsService } from 'src/app/service/details.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { EditTableComponent } from './edit-table/edit-table.component';
import { Router } from '@angular/router';
import { SaveidService } from 'src/app/service/saveID/saveid.service';

@Component({
  selector: 'app-alldetails',
  templateUrl: './alldetails.component.html',
  styleUrls: ['./alldetails.component.scss']
})
export class AlldetailsComponent {
  data: any[] = [];
  displayedData: any[] = this.data
  itemsPerPage = 10;
  currentPage = 1;
  pageNumbers: number[] = [];
  constructor(private _dialog: MatDialog, private _detailService: DetailsService, private _snackbarService: SnackbarService, private _router: Router, private _saveService: SaveidService) { }
  ngOnInit() {
    this.getAllGeneralDetails();
  }
  getAllGeneralDetails() {
    console.log('call function')
    // getAllBasicDetailsService
    // getDetailsBasisOfUser
    this._detailService.getDetailsBasisOfUser().subscribe({
      next: (res) => {
        console.log(res)
        this.data = res
        this.calculatePageNumbers();
        this.updateTableContent();
      },
      error: (error: HttpErrorResponse) => {
        this._snackbarService.openSnackbar('❌ Internal Server Error')
      }
    })
  }

  // edit dialog
  openDialog(data: any) {
    const dialogRef = this._dialog.open(EditTableComponent, {
      height: '80vh',
      width: '40vw',
      data: { id: data.id },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log(`Dialog result:`);
    });
  }

  // Pagination 
  calculatePageNumbers() {
    const pageCount = Math.ceil(this.data.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  updateTableContent() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedData = this.data.slice(startIndex, endIndex);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateTableContent();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTableContent();
    }
  }

  nextPage() {
    if (this.currentPage < this.pageNumbers.length) {
      this.currentPage++;
      this.updateTableContent();
    }
  }



  /**
   * Create New item
   */

  public createNew(data: any) {
    if (data) {
      this._saveService.setSharedData(
        {
          id: data.id,
          edit: true
        }
      )
      this._router.navigate(['/parking/create/Details/General'])
    } else {
      this._saveService.setSharedData(
        {
          id: '',
          edit: false
        }
      )
      this._router.navigate(['/parking/create'])
    }
  }
}
