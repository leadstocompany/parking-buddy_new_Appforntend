import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthService } from '../service/auth/auth.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() routerOption: Array<{ name: string, router: string, active: boolean }> = []
  public myActiveRoute: Array<{ name: string, router: string, active: boolean }> = [];
  showFiller = false;
  fullName:string='';
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef,private _auth:AuthService, media: MediaMatcher, private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.findActiveTab(this.router.url.split('/')[2])
    this.getUserData()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  /**
   * change active link active status
   * @param name 
   */
  public findActiveTab(name: string): void {
    this.myActiveRoute = JSON.parse(JSON.stringify([...this.routerOption]))
    this.myActiveRoute.forEach((e) => {
      if (e.name === name) {
        e.active = true
      }
    })
  }

  openProfileDialog() {
    this.dialog.open(EditProfileComponent, {
      width: '500px',
      height:'65vh',
      maxHeight: '90vh',
    });
  }

  public getUserData (){
    this._auth.getUser().subscribe({
      next:(res)=>{
        //console.log(res,'user data')
        this.fullName = res.first_name+' '+res.last_name
      },
      error:(error)=>{
        //console.log(error)
      }
    })
  }
}
