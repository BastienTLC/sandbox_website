import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {ListVilleComponent} from "./list-ville/list-ville.component";
import {ServerInfoComponent} from "./server-info/server-info.component";
import {ThreeSceneComponent} from "./three-scene/three-scene.component";

const routes: Routes = [
  { path: 'first-component', component: ServerInfoComponent },
  { path: 'second-component', component: ListVilleComponent },
  { path: 'three-js', component: ThreeSceneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
