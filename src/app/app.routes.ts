import { Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LoginComponent } from './routes/login/login.component';
import { MyFavouritesComponent } from './routes/profile/my-favourites/my-favourites.component';
import { MyTweempsComponent } from './routes/profile/my-tweemps/my-tweemps.component';
import { ProfileComponent } from './routes/profile/profile.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-tweemps',
        pathMatch: 'full',
      },
      {
        path: 'my-tweemps',
        component: MyTweempsComponent,
      },
      {
        path: 'my-favourites',
        component: MyFavouritesComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];
