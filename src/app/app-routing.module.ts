import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
//import { UserPagetwoComponent } from './user-pagetwo/user-pagetwo.component';

const routes: Routes = [
  {path: "", component:UserComponent},
  //{path: "two", component:UserPagetwoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
