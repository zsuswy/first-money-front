import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Survey} from '../../../model/Survey';
import {User} from '../../../model/User';
import {Order} from '../../../model/Order';
import {UserSurvey} from '../../../model/UserSurvey';
import {Observable} from 'rxjs/Observable';
import {WxBase} from '../../WxBase';
import {WxService} from '../../../services/wx-service.service';

@Component({
    selector: 'app-survey-pay',
    templateUrl: './survey-pay.component.html',
    styleUrls: ['./survey-pay.component.css']
})
export class SurveyPayComponent extends WxBase implements OnInit {
    /**
     * 当前测评id
     * */
    surveyId: number;


    /**
     * 当前用户测评id
     * */
    userSurveyId: number;

    /**
     * 已有订单号
     * */
    orderId: number;

    /**
     * 当前问卷
     * */
    survey: Survey;

    userSurvey: UserSurvey;

    /**
     * 当前用户
     * */
    user: User;

    /**
     * 余额抵扣金额
     * */
    balancePay: number;

    /**
     * 支付金额
     * */
    payAmount: number;


    constructor(private surveyService: SurveyService,
                private route: ActivatedRoute,
                protected router: Router,
                protected wxService: WxService) {
        super(wxService, router)
        this.survey = new Survey();
        this.user = new User();
    }

    ngOnInit() {
        // 获取参数
        this.route.paramMap.subscribe(params => {
            this.userSurveyId = Number(params.get('userSurveyId'));

            this.surveyService.getUserSurveyList({
                params: {'userSurveyId': this.userSurveyId, 'status': 0},
                page: null
            }).subscribe(resp => {
                // TODO:异常处理

                this.userSurvey = resp.data.list[0];
                this.surveyId = this.userSurvey.surveyId;
                this.orderId = this.userSurvey.orderId;

                if (this.userSurvey.status > 0) {
                    this.router.navigate(['/survey-do', this.userSurvey.id]);
                }

                console.log('this.userSurvey: ');
                console.log(resp.data.list[0]);

                Observable.forkJoin(this.surveyService.getSurvey(this.surveyId),
                    this.surveyService.getUser(this.userId))
                    .subscribe(respList => {
                        this.survey = respList[0].data;
                        this.user = respList[1].data;

                        this.balancePay = this.survey.price > this.user.balance ? this.user.balance : this.survey.price;
                        this.payAmount = this.survey.price - this.balancePay;
                    });
            });
        });
    }

    /**
     * 确定支付
     * */
    payConfirmed() {
        this.surveyService.confirmOrder({'orderId': this.orderId}).subscribe(resp => {
            if (resp.success) {
                let userSurvey = resp.data;
                console.log(['/survey-do', userSurvey.id]);
                this.router.navigate(['/survey-do', userSurvey.id]);
            }
        });
    }

}
