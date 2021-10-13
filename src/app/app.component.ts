import { Component } from '@angular/core';
import {
    Router,
    RouteConfigLoadStart,
    RouteConfigLoadEnd,
    RouterEvent,
} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'canvasboard';
    loading: boolean;
    constructor(router: Router) {
        this.loading = false;

        router.events.subscribe((event: RouterEvent): void => {
            if (event instanceof RouteConfigLoadStart) {
                this.loading = true;
            } else if (event instanceof RouteConfigLoadEnd) {
                this.loading = false;
            }
        });
    }
}
