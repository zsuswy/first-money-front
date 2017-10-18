import {Component, HostBinding, ViewChild} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import * as shape from 'd3-shape';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyService} from '../../../services/survey-service.service';
import {UserSurvey} from '../../../model/UserSurvey';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';
import {Cookie} from '../../../util/Cookie';
import {LoadingComponent} from '../../common/loading/loading.component';
import {SurveyResultDimensionScore} from '../../../model/SurveyResultDimensionScore';
import {ListSearchVo} from '../../../model/common/ListSearchVo';
import {SurveyDimension} from '../../../model/SurveyDimension';

@Component({
    templateUrl: './survey-result.component.html',
    animations: [slideInDownAnimation]
})
export class SurveyResultComponent extends WxBase {
    @ViewChild(LoadingComponent)
    private loadComponent: LoadingComponent;

    @HostBinding('@routeAnimation')
    routeAnimation = true;

    @HostBinding('style.display')
    display = 'block';

    @HostBinding('style.position')
    position = 'absolute';

    userSurveyId: number;
    userSurvey: UserSurvey;
    resultData: SurveyResultDimensionScore[];
    dimensionList: SurveyDimension[];

    view: any[] = [700, 400];

    // options
    curveLinearClosed = shape.curveLinearClosed;




    constructor(protected surveyService: SurveyService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected wxService: WxService) {
        super(wxService, router);
        route.paramMap.subscribe(params => {
            this.userSurveyId = Number(params.get('userSurveyId'));

            // 获取答题结果 和 维度设置
            this.surveyService.getUserSurvey(this.userSurveyId).subscribe(resp => {
                this.userSurvey = resp.data;
                this.loadComponent.loadComplete();

                // 将字符串转为JSON对象
                this.resultData = JSON.parse(this.userSurvey.result) as SurveyResultDimensionScore[];

                // 获取 维度设置
                let dimensionSearch = new ListSearchVo();
                dimensionSearch.page = null;
                dimensionSearch.params = {'surveyId': this.userSurvey.surveyId};

                this.surveyService.getSurveyDimensionList(dimensionSearch).subscribe(surveyResp => {
                    this.dimensionList = surveyResp.data.list;
                    console.log(this.resultData);
                    console.log(this.dimensionList);

                    this.prepareData();
                });
            });
        });
    }

    prepareData() {

    }

    onSelect(event) {
        console.log(event);
    }
}
