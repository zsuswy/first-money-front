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
import {Config} from '../modules/Config';

@Injectable()
export class SurveyService {
    constructor(private http: HttpClient) {
    };

    getSurveyList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(Config.WEB_APP_URL + '/survey/list', listSearchVo);
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
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/survey/get?id=' + id);
    }

    createSurvey(survey: Survey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/survey/create', survey);
    }

    updateSurvey(survey: Survey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/survey/update', survey);
    }

    getSurveyQuestionList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(Config.WEB_APP_URL + '/surveyQuestion/list', listSearchVo);
    }

    getSurveyQuestion(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/surveyQuestion/get?id=' + id);
    }

    createSurveyQuestion(surveyQuestion: SurveyQuestion): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/surveyQuestion/create', surveyQuestion);
    }

    updateSurveyQuestion(surveyQuestion: SurveyQuestion): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/surveyQuestion/update', surveyQuestion);
    }

    deleteSurveyQuestion(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/surveyQuestion/delete?id=' + id);
    }

    getSurveyClassList(enabled: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/surveyClass/list?enabled=' + enabled);
    }

    getSurveyDimensionList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(Config.WEB_APP_URL + '/surveyDimension/list', listSearchVo);
    }

    getSurveyDimension(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/surveyDimension/get?id=' + id);
    }

    createSurveyDimension(surveyDimension: SurveyDimension): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/surveyDimension/create', surveyDimension);
    }

    updateSurveyDimension(surveyDimension: SurveyDimension): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/surveyDimension/update', surveyDimension);
    }

    deleteSurveyDimension(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/surveyDimension/delete?id=' + id);
    }

    getSurveyDimensionScoreTextList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(Config.WEB_APP_URL + '/surveyDimensionScoreText/list', listSearchVo);
    }

    getSurveyDimensionScoreText(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/surveyDimensionScoreText/get?id=' + id);
    }

    createSurveyDimensionScoreText(surveyDimensionScoreText: SurveyDimensionScoreText): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/surveyDimensionScoreText/create', surveyDimensionScoreText);
    }

    updateSurveyDimensionScoreText(surveyDimensionScoreText: SurveyDimensionScoreText): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/surveyDimensionScoreText/update', surveyDimensionScoreText);
    }

    deleteSurveyDimensionScoreText(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/surveyDimensionScoreText/delete?id=' + id);
    }

    createOrGetOrderPayInfo(order: Order): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/order/pay', order);
    }

    getOrderList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(Config.WEB_APP_URL + '/order/list', listSearchVo);
    }

    getUserSurveyList(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(Config.WEB_APP_URL + '/userSurvey/list', listSearchVo);
    }

    getUserSurveyListWithDetail(listSearchVo: ListSearchVo): Observable<ListResponseResult> {
        return this.http.post<ListResponseResult>(Config.WEB_APP_URL + '/userSurvey/detailList', listSearchVo);
    }

    getUserSurvey(id: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/userSurvey/get?id=' + id);
    }

    updateUserSurvey(userSurvey: UserSurvey): Observable<ResponseResult> {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/userSurvey/update', userSurvey);
    }

    getUser(userId: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/user/get?id=' + userId);
    }

    confirmOrder(orderId: number): Observable<ResponseResult> {
        return this.http.get<ResponseResult>(Config.WEB_APP_URL + '/order/confirm?orderId=' + orderId);
    }

    shareSurvey(surveyId: number) {
        return this.http.post<ResponseResult>(Config.WEB_APP_URL + '/user/share', {'surveyId': surveyId});
    }
}
