import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {Survey} from '../../../model/Survey';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Order} from '../../../model/Order';
import {User} from '../../../model/User';

@Component({
    templateUrl: './survey-detail-initial.component.html'
})
export class SurveyDetailInitialComponent implements OnInit {
    survey = new Survey();
    surveyId: number;


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

    constructor(private surveyService: SurveyService, private route: ActivatedRoute,
                private router: Router, private domSanitizer: DomSanitizer) {
        this.user = new User();

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.surveyId = Number(params.get("surveyId"));

            this.surveyService.getSurvey(this.surveyId).subscribe(resp => {
                this.survey = resp.data;

                this.balancePay = this.survey.price > this.survey.price ? this.user.balance : this.survey.price;
                this.payAmount = this.survey.price - this.balancePay;
            })
        });

// TODO: 根据用户ID获取订单号

    }

    /**
     * 支付
     * */
    pay() {
        // TODO: 跳转到支付页面，判断是否需要创建订单。
        let order = new Order();
        order.payAmount = this.payAmount;
        order.balancePayAmount = this.balancePay;
        order.totalAmount = this.survey.price;
        order.userId = 3; // TODO: hardcoded
        order.creatTime = new Date();
        order.payType = 2;

        this.surveyService.createOrder(order).subscribe(resp => {
            if (resp.success) {
                this.router.navigate(['/survey/survey-do', {userSurveyId: 12}]);
            } else {

            }
        });

        this.router.navigate(['/pages/pay', {surveyId: this.surveyId}]);
    }

    getHtml() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.survey.description);
    }


}
