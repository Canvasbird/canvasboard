import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorService } from '../services/http-error.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) {}
    constructor(private httpErrorService: HttpErrorService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.spinnerService.requestStarted();
        return next.handle(request)
            .pipe(
                catchError(err => {
                    let errMsg = "";
                    if (err.error instanceof ErrorEvent) {
                     
                        this.httpErrorService.showError('An error occurred:' + err.error.message);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        this.httpErrorService.showError(
                            `Backend returned code ${err.status}, `
                             + `body was: ${err.error}`);
                    }

                    return throwError(
                        'Something bad happened; please try again later.');
                })
            )
    }
      
    handler(next, request) {
      return next.handle(request)
        .pipe(
          tap(
            (event) => {
              if (event instanceof HttpResponse) {
                this.spinnerService.requestEnded();
              }
          },
          (error: HttpErrorResponse) => {
                this.spinnerService.resetSpinner();
                throw error;
          }
      ),
     );
   }


    private handleError(error: HttpErrorResponse) {
        console.log('Handle Error')
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.error('An error occurred:', error.error.message);
            // this._ngbModal.open(AlertPopupComponent);
            // modalRef.componentInstance.name = 'World';
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.error(
            //     `Backend returned code ${error.status}, ` +
            //     `body was: ${error.error}`);

            // modalRef.componentInstance.name = 'World';
        }

        // this.httpErrorService.addErrors(["Something bad happened; please try again later."]);

        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}    
