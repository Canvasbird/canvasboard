import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContributionComponent } from "./contribution.component";
import { FooterModule } from "../footer/footer.module";

@NgModule({
  declarations: [ContributionComponent],
  imports: [CommonModule],
})
export class ContributionModule {}
