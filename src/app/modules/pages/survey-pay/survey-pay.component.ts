import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Survey} from '../../../model/Survey';
import {User} from '../../../model/User';
import {Order} from '../../../model/Order';
import {OrderVo} from '../../../model/OrderVo';

@Component({
    selector: 'app-survey-pay',
    templateUrl: './survey-pay.component.html',
    styleUrls: ['./survey-pay.component.css']
})
export class SurveyPayComponent implements OnInit {
    /**
     * 当前测评id
     * */
    surveyId: number;

    /**
     * 已有订单号
     * */
    orderId: number;

    /**
     * 当前问卷
     * */
    survey: Survey;

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


    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router) {
        this.survey = new Survey();
        this.user = new User();
    }

    ngOnInit() {
        // 获取参数
        this.route.paramMap.subscribe(params => {
            this.surveyId = Number(params.get("surveyId"));

            this.surveyService.getSurvey(this.surveyId).subscribe(resp => {
                this.survey = resp.data;

                this.balancePay = this.survey.price > this.survey.price ? this.user.balance : this.survey.price;
                this.payAmount = this.survey.price - this.balancePay;
            })
        });

        // TODO: 获取用户id
    }

    /**
     * 确定支付
     * */
    payConfirmed() {
        this.surveyService.confirmPay({}).subscribe(resp => {
            if (resp.success) {
                this.router.navigate(['/survey/survey-do', 12]);
            }
        });
    }

}
