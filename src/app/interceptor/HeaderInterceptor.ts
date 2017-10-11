import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        const clonedRequest = req.clone({
            headers: req.headers
                .set('Accept-Base',
                    localStorage.getItem('userId') == null ? '' : localStorage.getItem('userId'))
                .set('Accept-Wx',
                    localStorage.getItem('wxOpenId') == null ? '' : localStorage.getItem('wxOpenId'))
        });

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    }
}
