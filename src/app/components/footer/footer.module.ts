import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer.component";
import { ContributionModule } from "../contribution/contribution.module";

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, ContributionModule],
  exports: [FooterComponent],
})
export class FooterModule {}
