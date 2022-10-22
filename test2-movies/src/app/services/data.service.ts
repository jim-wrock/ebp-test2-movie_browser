import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private url: string = 'https://api.themoviedb.org/3';
  public favoriteMovies: Array<Movie> | undefined;
  public movies: Array<Movie> | undefined;
  constructor(private http: HttpClient) {
    this.favoriteMovies = new Array();
    this.loadFavMovies();
   }

  /**
   * Update user's favorites from local storage if existing
   */
  loadFavMovies() {
		if (localStorage.getItem("favoriteMovies")) {
			this.favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
		}
	}

  /**
   * Savet user's favorites to local storage
   */
	saveFavMovies() {
		localStorage.setItem("favoriteMovies", JSON.stringify(this.favoriteMovies));
	}

  /**
   * Api call to TMDB
   * @param keyword keywords to search
   */
  sendSearch(keyword: string): Observable<any> {
    return this.http.get<any>(`${this.url}/search/movie?api_key=${environment.api_key}&query=${keyword}`);
  }

  /**
   * Search a movie in TMDB & updates its backdrop_path to be usable in app
   * @param keyword keywords to search
   */
  searchMovie(keyword: string) {
    this.sendSearch(keyword).subscribe(res => {
      if (res.results) {
        this.movies = res.results;
        if (this.movies !== undefined) {
          this.movies.forEach(movie => {
            if (movie.backdrop_path) {
              movie.backdrop_path = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}?api_key=${environment.api_key}`;
            }
          });
        }
      }
    }, error => {
      console.error("Error retrieving movie from TMDB => ", error);
    });
  }

  /**
   * Adds a movie to user's favorites & update the local storage corresponding value
   */
  addToFavorites(selectedMovie: Movie | undefined) {
    if (this.favoriteMovies && selectedMovie) {
      if (this.favoriteMovies.find(favMovie => favMovie === selectedMovie)) {
        console.error("this movie is already one of your favorites !");
      } else {
        this.favoriteMovies.push(selectedMovie);
        this.saveFavMovies();
      }
    }
  }

}
