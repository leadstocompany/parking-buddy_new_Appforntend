import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodesService } from 'src/app/service/barcodes.service';

@Component({
  selector: 'app-all-blackouts',
  templateUrl: './all-blackouts.component.html',
  styleUrls: ['./all-blackouts.component.scss']
})
export class AllBlackoutsComponent {
  public parkingOptions: string[] = [
    'Self Uncovered',
    'Self Rooftop',
    'Self Indoor',
    'Valet Indoor',
    'Valet Covered',
    'Valet Ur',
    'Valet Rooftop',
    'Valet Curbside',
    'Self Uncovered - Oversized',
    'Self Covered - Oversized',
    'Self Indoor - Oversized',
    'Self Rooftop - Oversized',
    'Self Curbside - Oversized',
    'Valet Uncovered - Oversized',
    'Valet Covered - Oversized',
    'Valet Indoor - Oversized',
    'Valet Rooftop - Oversized',
    'Valet Curbside - Oversized'
  ];
  blackouts!: FormGroup
  constructor(private _formBuilder: FormBuilder,private _barAndBlackService:BarcodesService) { }
  ngOnInit() {
    this.blackouts = this._formBuilder.group({
      product:[null],
      blackoutsType:[null],
      date:[new Date(),new Date()],
      cars:[null],
      recurrence:['On'],
      allowedDay:[null]
    })
  }

public createBlackout ():void{
  const formData = new FormData();
  formData.append('',this.blackouts.controls['product'].value)
  formData.append('',this.blackouts.controls['blackoutsType'].value)
  formData.append('',this.blackouts.controls['date'].value)
  formData.append('',this.blackouts.controls['cars'].value)
  formData.append('',this.blackouts.controls['recurrence'].value)
  formData.append('',this.blackouts.controls['allowedDay'].value)
  this._barAndBlackService.createBlackouts(formData).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(error)=>{
      console.log(error)
    }
  })

}


}
