import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { FooterModule } from "../footer/footer.module";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FooterModule, HomeRoutingModule],
})
export class HomeModule {}
