import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute , Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moviedetails',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css'
})
export class MoviedetailsComponent implements OnInit {

  isActive = false;
  
  movieTitle!: string;
  movieDetails: any = null;

  constructor(private route: ActivatedRoute,private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieTitle = this.route.snapshot.params['title'];
    this.fetchMovieDetails();
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }


  fetchMovieDetails(): void {
    this.movieService.getMoviesByPage(1).subscribe((data) => {
      if (data && data.results) {
        this.movieDetails = data.results.find((movie: any) =>
          movie.title.toLowerCase() === decodeURIComponent(this.movieTitle.replace(/-/g, ' ')).toLowerCase()
        );
      }
      if (!this.movieDetails) {
        console.error('Movie not found');
      }
    });
  }

 
}
