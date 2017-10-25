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

    createJsapiSignature(url: string): Observable<ResponseResult> {
        // alert(url);
        // alert(window.location.href);
        // alert(window.location.search);
        // alert(window.navigator.userAgent);
        // if (window.location.href.indexOf('singlemessage') > 0 && window.navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
        //     // 是iphone，需要做特殊处理
        //     url = url.substr(0, url.indexOf('?')) + url.substring(url.lastIndexOf('?'))
        // }
        if (url.indexOf("#") > 0) {
            url = url.split("#")[0];
        }
        url = encodeURIComponent(url);
        return this.http.get<ResponseResult>(Config.WEB_SERVICE_APP_URL + '/wx/createJsapiSignature?url=' + url);
    }
}
