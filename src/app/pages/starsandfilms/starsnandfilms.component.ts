import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../service/movie.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-starsnandfilms',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './starsnandfilms.component.html',
  styleUrl: './starsnandfilms.component.css'
})
export class StarsnandfilmsComponent implements OnInit{


  isActive = false;

  actorName: string = '';
  actorDetails: any = {};
  actorMovies: any[] = [];
  movies: any[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  page: number = 1;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }
  toggleMenu() {
    this.isActive = !this.isActive;
  }
  // Function to search for an actor
 searchActor(): void {
  if (!this.actorName.trim()) {
    return;
  }

  // Reset state before new search
  this.loading = true;
  this.errorMessage = '';
  this.actorDetails = {};
  this.actorMovies = [];

  this.movieService.searchActor(this.actorName).subscribe(
    (response) => {
      if (response && response.results && response.results.length > 0) {
        const actor = response.results[0];
        this.actorDetails = actor;
        this.getActorMovies(actor.id);
      } else {
        this.actorDetails = {};
        this.actorMovies = [];
        this.errorMessage = 'No actor found with this name.';
        this.loading = false;
      }
    },
    (error) => {
      this.actorDetails = {};
      this.actorMovies = [];
      this.errorMessage = 'Error fetching actor data.';
      console.error(error);
      this.loading = false;
    }
  );
}


getActorMovies(actorId: number): void {
  this.actorMovies = [];
  this.loading = true;

  this.movieService.getActorMovies(actorId).subscribe(
    (response) => {
      if (response && response.cast && response.cast.length > 0) {
        this.actorMovies = response.cast;
      } else {
        this.actorMovies = [];
        this.errorMessage = 'No movies found for this actor.';
      }
    },
    (error) => {
      this.actorMovies = [];
      this.errorMessage = 'Error fetching actor movies.';
      console.error(error);
    },
    () => {
      this.loading = false;
    }
  );
}


  // New method to load popular movies
  loadMovies(): void {
    this.loading = true;
    this.errorMessage = '';
    this.movieService.getMoviesByPage(this.page).subscribe(
      (response) => {
        if (response && response.results && response.results.length > 0) {
          this.movies = response.results;
        } else {
          this.errorMessage = 'No movies found.';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching movies.';
        console.error(error);
      },
      () => {
        this.loading = false;
      }
    );
  }

  // Method to load more movies (pagination)
  loadMoreMovies(): void {
    this.page++;
    this.loadMovies();
  }

  showMovieDetails(movie: any): void {
    const movieTitle = encodeURIComponent(movie.title.toLowerCase().replace(/ /g, '-'));
    this.router.navigate(['/movie', movieTitle]);
  }

}
