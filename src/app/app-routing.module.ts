import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {ListVilleComponent} from "./list-ville/list-ville.component";

const routes: Routes = [
  { path: 'first-component', component: NavbarComponent },
  { path: 'second-component', component: ListVilleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
