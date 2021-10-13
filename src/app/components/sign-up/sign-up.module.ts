import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatPasswordStrengthModule,
        MatTooltipModule,
        HttpClientModule,
        SignUpRoutingModule,
        MatProgressSpinnerModule,
    ],
    exports: [SignUpComponent],
})
export class SignUpModule {}
