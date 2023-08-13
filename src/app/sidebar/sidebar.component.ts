import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() routerOption: Array<{ name: string, router: string, active: boolean }> = []
  public myActiveRoute: Array<{ name: string, router: string, active: boolean }> = [];
  showFiller = false;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.findActiveTab(this.router.url.split('/')[2])
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
}
