import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGuard],
            imports: [RouterTestingModule, HttpClientTestingModule],
        });
    });

    it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
        expect(guard).toBeTruthy();
    }));
});
