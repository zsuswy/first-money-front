/**
 * Created by sunwuyang on 17/7/28.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ResponseResult} from '../model/common/ResponseResult';
import {ListResponseResult} from '../model/common/ListResponseResult';
import {JsApiSignature} from '../model/JsApiSignature';

@Injectable()
export class WxService {
    SERVICE_HOST_PREFIX = 'http://quiz.ronmob.com/qz';

    // SERVICE_HOST_PREFIX = 'http://localhost:9999';

    constructor(private http: HttpClient) {
    };

    createJsapiSignature(url: String): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/wx/createJsapiSignature?url=' + url);
    }
}
