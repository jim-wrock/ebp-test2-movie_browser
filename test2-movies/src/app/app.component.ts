import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public router: Router, public dataService: DataService) {}

  /**
   * navigation made via the main nav bar button
   * if a search has already been made, go to dashboard / else go to home page
   */
  navigateMain() {
    const url = this.dataService.movies ? '/dashboard' : '/';
    this.router.navigate([url]);
  }

  /**
   * Calls the dashboard component with user's research keywords as params
   * @param keyword user's keywords to pass to the dashboard component for research
   */
  quickSearch(keywords: string) {
    this.router.navigate(
      ['/dashboard'],
      { queryParams: { keywords: keywords } }
    );
  }
}
