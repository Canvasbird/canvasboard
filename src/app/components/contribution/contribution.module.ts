import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContributionRoutingModule } from './contribution-routing.module';
import { ContributionComponent } from './contribution.component';
import { FooterModule } from '../footer/footer.module';

@NgModule({
    declarations: [ContributionComponent],
    imports: [CommonModule, ContributionRoutingModule, FooterModule],
})
export class ContributionModule {}
