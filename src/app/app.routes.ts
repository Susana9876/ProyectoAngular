import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'signUp', component: SignUpComponent},
    {path: 'search', component: SearchComponent},
    {path: 'user/:id', component: UserComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
]