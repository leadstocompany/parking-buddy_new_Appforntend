import { Component } from '@angular/core';

@Component({
  selector: 'app-all-blackouts',
  templateUrl: './all-blackouts.component.html',
  styleUrls: ['./all-blackouts.component.scss']
})
export class AllBlackoutsComponent {
  public parkingOptions: string[] = [
    'Self Uncovered',
    'You',
    'Self Rooftop',
    'Self Indoor',
    'Type',
    'Valet Indoor',
    'Valet Covered',
    'Valet Ur',
    'Valet Rooftop',
    'Valet Curbside',
    'Self Uncovered - Oversized',
    'Save',
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
}
