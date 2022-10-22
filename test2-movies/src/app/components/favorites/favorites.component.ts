import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public detailsShown: boolean = false;
  public selectedMovie: Movie | undefined;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  /**
   * shows the details modal on movie card click / close it when shown
   * @param id id of the movie to display with details
   */
  toggleDetails(id?: number) {
    this.detailsShown = !this.detailsShown;
    if (this.detailsShown) {
      this.selectedMovie = this.dataService.favoriteMovies?.find(movie => movie.id === id);
    } else {
      this.selectedMovie = undefined;
    }
  }

}
