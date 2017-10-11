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
import {Order} from '../model/Order';
import {UserSurvey} from '../model/UserSurvey';

@Injectable()
export class SurveyService {
    SERVICE_HOST_PREFIX = 'http://quiz.ronmob.com/qz';

    // SERVICE_HOST_PREFIX = 'http://localhost:9999';

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

    getSurvey(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/survey/get?id=' + id);
    }

    createSurvey(survey: Survey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/survey/create', survey);
    }

    updateSurvey(survey: Survey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/survey/update', survey);
    }

    getSurveyQuestionList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/list', listSearchVo);
    }

    getSurveyQuestion(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/get?id=' + id);
    }

    createSurveyQuestion(surveyQuestion: SurveyQuestion): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/create', surveyQuestion);
    }

    updateSurveyQuestion(surveyQuestion: SurveyQuestion): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/update', surveyQuestion);
    }

    deleteSurveyQuestion(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyQuestion/delete?id=' + id);
    }

    getSurveyClassList(enabled: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyClass/list?enabled=' + enabled);
    }

    getSurveyDimensionList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimension/list', listSearchVo);
    }

    getSurveyDimension(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimension/get?id=' + id);
    }

    createSurveyDimension(surveyDimension: SurveyDimension): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimension/create', surveyDimension);
    }

    updateSurveyDimension(surveyDimension: SurveyDimension): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimension/update', surveyDimension);
    }

    deleteSurveyDimension(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimension/delete?id=' + id);
    }

    getSurveyDimensionScoreTextList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimensionScoreText/list', listSearchVo);
    }

    getSurveyDimensionScoreText(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimensionScoreText/get?id=' + id);
    }

    createSurveyDimensionScoreText(surveyDimensionScoreText: SurveyDimensionScoreText): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimensionScoreText/create', surveyDimensionScoreText);
    }

    updateSurveyDimensionScoreText(surveyDimensionScoreText: SurveyDimensionScoreText): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimensionScoreText/update', surveyDimensionScoreText);
    }

    deleteSurveyDimensionScoreText(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/surveyDimensionScoreText/delete?id=' + id);
    }

    createOrder(order: Order): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/order/create', order);
    }

    getOrderList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/order/list', listSearchVo);
    }

    getUserSurveyList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/userSurvey/list', listSearchVo);
    }

    getUserSurveyListWithDetail(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(this.SERVICE_HOST_PREFIX + '/userSurvey/detailList', listSearchVo);
    }

    getUserSurvey(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/userSurvey/get?id=' + id);
    }

    updateUserSurvey(userSurvey: UserSurvey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/userSurvey/update', userSurvey);
    }

    confirmOrder(params: any): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/order/confirmOrder', params);
    }

    getUser(userId: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(this.SERVICE_HOST_PREFIX + '/user/get?id=' + userId);
    }

    shareSurvey(surveyId: number) {
        return this.http.post<ResponseResult>(this.SERVICE_HOST_PREFIX + '/user/share', {'surveyId': surveyId});
    }
}
