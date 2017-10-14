/**
 * Created by sunwuyang on 17/7/28.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ResponseResult} from '../model/common/ResponseResult';
import {Config} from '../modules/Config';

@Injectable()
export class WxService {
    constructor(private http: HttpClient) {
    }

    createJsapiSignature(url: String): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/wx/createJsapiSignature?url=' + url);
    }
}
