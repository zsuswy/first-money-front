/**
 * Created by sunwuyang on 17/7/28.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ResponseResult} from '../model/common/ResponseResult';
import {ListSearchVo} from '../model/common/ListSearchVo';
import {Survey} from '../model/Survey';
import {SurveyQuestion} from '../model/SurveyQuestion';
import {ListResponseResult} from '../model/common/ListResponseResult';
import {SurveyDimension} from '../model/SurveyDimension';
import {SurveyDimensionScoreText} from '../model/SurveyDimensionScoreText';

@Injectable()
export class SurveyService {
    SERVICE_HOST_PREFIX = 'http://quiz.ronmob.com/qz'; // 'http://localhost:9999';

    constructor(private http: HttpClient) {
    };

    getSurveyList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/survey/list', listSearchVo);
    }

    getSurveyHotList(): Observable<ListResponseResult> {
        let listSearchVo = new ListSearchVo();
        listSearchVo.page = null;
        listSearchVo.params = {'isHot': 1};
        return this.getSurveyList(listSearchVo);
    }

    getSurveyNewList(): Observable<ListResponseResult> {
        let listSearchVo = new ListSearchVo();
        listSearchVo.page = null;
        listSearchVo.params = {'isNew': 1};
        return this.getSurveyList(listSearchVo);
    }

    getSurveySuperList(): Observable<ListResponseResult> {
        let listSearchVo = new ListSearchVo();
        listSearchVo.page = null;
        listSearchVo.params = {'isSuper': 1};
        return this.getSurveyList(listSearchVo);
    }
}
