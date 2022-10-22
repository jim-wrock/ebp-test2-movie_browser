import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public detailsShown: boolean = false;
  public selectedMovie: Movie | undefined;
  constructor(public dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // search a movie in TMDB if any search keywords params exists in the activatedRoute
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.keywords) {
        this.dataService.searchMovie(params.keywords);
      }
    });
  }

  /**
   * shows the details modal on movie card click / close it when shown
   * @param id id of the movie to display with details
   */
  toggleDetails(id?: number) {
    this.detailsShown = !this.detailsShown;
    if (this.detailsShown) {
      this.selectedMovie = this.dataService.movies?.find(movie => movie.id === id);
    } else {
      this.selectedMovie = undefined;
    }
  }

}
