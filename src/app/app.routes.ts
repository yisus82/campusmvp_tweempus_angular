import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { CreateTweempComponent } from './routes/create-tweemp/create-tweemp.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LoginComponent } from './routes/login/login.component';
import { MyFavouritesComponent } from './routes/profile/my-favourites/my-favourites.component';
import { MyTweempsComponent } from './routes/profile/my-tweemps/my-tweemps.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { RegisterComponent } from './routes/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard],
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
  {
    path: 'create-tweemp',
    component: CreateTweempComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/' },
];
