import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { DeleteFolderModalComponent } from './delete-folder-modal.component';

describe('DeleteFolderModalComponent', () => {
    let component: DeleteFolderModalComponent;
    let fixture: ComponentFixture<DeleteFolderModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeleteFolderModalComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteFolderModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
