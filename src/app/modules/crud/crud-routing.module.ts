import { CrudComponent } from "./pages/crud.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "crud",
    component: CrudComponent,
  },
  { path: "**", redirectTo: "crud" },
  {
    path: "",
    redirectTo: "crud",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}
