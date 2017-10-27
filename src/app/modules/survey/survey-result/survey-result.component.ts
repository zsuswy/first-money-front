import {Component, HostBinding, ViewChild} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyService} from '../../../services/survey-service.service';
import {UserSurvey} from '../../../model/UserSurvey';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';
import {LoadingComponent} from '../../common/loading/loading.component';
import {SurveyResultDimensionScore} from '../../../model/SurveyResultDimensionScore';
import {ListSearchVo} from '../../../model/common/ListSearchVo';
import {SurveyDimension} from '../../../model/SurveyDimension';
import {Observable} from 'rxjs/Observable';
import {Survey} from '../../../model/Survey';
import {TemplateType} from '../../../model/Enum/TemplateType';

@Component({
    templateUrl: './survey-result.component.html',
    styleUrls: ['./survey-result.component.css']
})
export class SurveyResultComponent extends WxBase {
    @ViewChild(LoadingComponent)
    private loadComponent: LoadingComponent;

    userSurveyId: number;

    // 测评信息
    survey: Survey = new Survey();

    // 用户测评
    userSurvey: UserSurvey = new UserSurvey();

    // 测试结果
    resultData: SurveyResultDimensionScore[];

    // 维度信息
    dimensionList: SurveyDimension[];

    templateType: number = 0;


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

                Observable.zip(this.surveyService.getSurveyDimensionList(dimensionSearch),
                    this.surveyService.getSurvey(this.userSurvey.surveyId))
                    .subscribe(surveyRespList => {
                        this.dimensionList = surveyRespList[0].data.list;
                        this.survey.assignToSelf(surveyRespList[1].data);

                        this.setTemplate();
                        this.prepareData();
                    });
            });
        });
    }

    /**
     * 设置模版类型
     * */
    setTemplate() {
        // 如果有设置模版设置，那么使用用户设置的模版
        if (this.survey.extraSettings.templateType > 0) {
            this.templateType = this.survey.extraSettings.templateType;
            return;
        } else {
            this.inferTemplate();
        }

    }

    /**
     * 根据维度数据计算模版
     * */
    inferTemplate() {
        let totalDimensionCount = this.dimensionList.length;
        let firstLevelDimension = this.dimensionList.filter(item => item.parentId == null || item.parentId < 1);

        // 只有一个维度
        if (totalDimensionCount == 1) {
            this.templateType = TemplateType.SINGLE_DIMENSION;
        }

        // 都是子维度，没有默认维度
        else if (firstLevelDimension.length == 0) {
            this.templateType = TemplateType.MULTIPLE_WITH_NO_FIRST_LEVEL;
        }

        // 有一个默认维度，其它都是子维度
        else if (firstLevelDimension.length == 0) {
            this.templateType = TemplateType.MULTIPLE_WITH_SINGLE_FIRST_LEVEL;
        }
    }

    prepareData() {

    }

    onSelect(event) {
    }
}
