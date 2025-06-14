import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-newarrivals',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './newarrivals.component.html',
  styleUrl: './newarrivals.component.css'
})
export class NewarrivalsComponent implements OnInit{

  newArrivals: any[] = []; 
  currentPage: number = 1;
  totalPages:number = 0;
  loading: boolean = true;

  isActive = false;

  constructor(private movieServie:MovieService, private router:Router){}


  ngOnInit(): void {
    this.loadMovies(this.currentPage);
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  loadMovies(page: number): void {
    this.loading = true;
    this.movieServie.getNewArrivalsByPage(page).subscribe(
      (data) => {
        if (data && data.results) {
          console.log(data);
          this.newArrivals = data.results;
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

  nextPage(): void {
    if (this.currentPage) {
      this.currentPage++;
      this.loadMovies(this.currentPage)
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies(this.currentPage)
    }
  } 

  showMovieDetails(movie: any): void {
    const movieTitle = encodeURIComponent(movie.title.toLowerCase().replace(/ /g, '-'));
    this.router.navigate(['/movie', movieTitle]);
  }
  
}
