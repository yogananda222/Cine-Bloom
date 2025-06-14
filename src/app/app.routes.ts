import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviedetailsComponent } from './pages/moviedetails/moviedetails.component';
import { TopratedComponent } from './pages/toprated/toprated.component';
import { NewarrivalsComponent } from './pages/newarrivals/newarrivals.component';
import { StarsnandfilmsComponent } from './pages/starsandfilms/starsnandfilms.component';

export const routes: Routes = [

    {path:'', component: HomeComponent},
    { path: 'movie/:title', component: MoviedetailsComponent },
    {path:'topRatedMovies', component: TopratedComponent},
    {path:'newArrivals', component:NewarrivalsComponent},
    {path:'stars&films', component:StarsnandfilmsComponent}
];
