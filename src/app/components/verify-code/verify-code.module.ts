import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerifyCodeRoutingModule } from './verify-code-routing.module';
import { VerifyCodeComponent } from './verify-code.component';

@NgModule({
    declarations: [VerifyCodeComponent],
    imports: [CommonModule, VerifyCodeRoutingModule],
    exports: [VerifyCodeComponent],
})
export class VerifyCodeModule {}
