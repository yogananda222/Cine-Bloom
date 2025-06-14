import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,  // Mark as standalone component
  imports: [CommonModule,FormsModule],  // Import CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {

  searchQuery: string = '';

  isActive = false;

  movies: any[] = [];
  currentPage: number = 1;
  totalPages:number = 0;
  searchTerm: string = '';
  loading: boolean = true;
  genreMovies: any[] = [];
  selectedGenre: number | null = null;
  selectedGenreName: string = '';
  searchResults: any[] = [];
  viewState: 'movies' | 'search' | 'genre' = 'movies';

  genres: { [key: number]: string } = {
    28: 'Action',
    35: 'Comedy',
    18: 'Drama',
    10749: 'Romance',
    27: 'Horror',
    878: 'Science Fiction',
    16: 'Animation',
    53: 'Thriller',
    12: 'Adventure'
  };

  constructor(private movieService: MovieService,private router:Router) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage);
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }



  search(): void {
    if (!this.searchQuery.trim()) {
      return;
    }
    this.loading = true;
    this.viewState = 'search'; // Show search results
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe(
      (data) => {
        if (data && data.results) {
          this.searchResults = data.results; // Store the search results
          this.totalPages = data.total_pages; // Get total pages for pagination
        } else {
          console.error('No search results found');
          this.searchResults = [];
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error searching movies:', error);
        this.loading = false;
      }
    );
  }
  
  loadMovies(page: number): void {
    this.loading = true;
    this.viewState = 'movies';
    this.movieService.getMoviesByPage(page).subscribe(
      (data) => {
        if (data && data.results) {
          this.movies = data.results;
        } else {
          console.error('No movie data received');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      }
    );
  }

  fetchMoviesByGenre(): void {
    if (this.selectedGenre !== null) {
      this.loading = true;
      this.viewState = 'genre'; // Show genre movies
      this.selectedGenreName = this.genres[this.selectedGenre];
      this.movieService.getMoviesByGenre(this.selectedGenre, this.currentPage).subscribe(
        (data) => {
          if (data && data.results) {
            this.genreMovies = data.results; // Store the genre movies
            this.totalPages = data.total_pages; // Get total pages for pagination
          } else {
            console.error('No genre movies found');
            this.genreMovies = [];
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching genre movies:', error);
          this.loading = false;
        }
      );
    }
  }



  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage) {
      this.currentPage++;
      if (this.viewState === 'movies') {
        this.loadMovies(this.currentPage);
      } else if (this.viewState === 'genre') {
        this.fetchMoviesByGenre();
      } else if (this.viewState === 'search') {
        this.search();
      }
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.viewState === 'movies') {
        this.loadMovies(this.currentPage);
      } else if (this.viewState === 'genre') {
        this.fetchMoviesByGenre();
      } else if (this.viewState === 'search') {
        this.search();
      }
    }
  } 

  showMovieDetails(movie: any): void {
    const movieTitle = encodeURIComponent(movie.title.toLowerCase().replace(/ /g, '-'));
    this.router.navigate(['/movie', movieTitle]);
  }

  
}