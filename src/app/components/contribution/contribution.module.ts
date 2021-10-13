import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContributionRoutingModule } from './contribution-routing.module';
import { ContributionComponent } from './contribution.component';

@NgModule({
    declarations: [ContributionComponent],
    imports: [CommonModule, ContributionRoutingModule],
})
export class ContributionModule {}
