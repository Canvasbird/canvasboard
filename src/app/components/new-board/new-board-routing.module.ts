import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBoardComponent } from './new-board.component';

const routes: Routes = [
    { path: ':folderId/creative-board', component: NewBoardComponent },
    { path: 'creative-board/:fileId', component: NewBoardComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewBoardRoutingModule {}
