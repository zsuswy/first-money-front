import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {Survey} from '../../../model/Survey';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Order} from '../../../model/Order';
import {User} from '../../../model/User';
import {OrderVo} from '../../../model/OrderVo';
import {ListSearchVo} from '../../../model/common/ListSearchVo';

@Component({
    templateUrl: './survey-detail-initial.component.html'
})
export class SurveyDetailInitialComponent implements OnInit {
    survey = new Survey();
    surveyId: number;

    /**
     * 已存在的或者新创建的 userSurveyId
     * */
    userSurveyId: number;

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

    /**
     * 是否有之前的订单
     * */
    hasOldOrder = false;

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
            });
        });

        // 查询是存在已经有的订单
        let listSearchVo = new ListSearchVo();
        listSearchVo.page = null;
        listSearchVo.params = {userId: 1, surveyId: this.surveyId, status: 0};

        this.surveyService.getUserSurveyList(listSearchVo).subscribe(resp => {
            console.log(resp.data);
            if (resp.data != null && resp.data.list.length > 0) {
                this.hasOldOrder = true;
                this.userSurveyId = resp.data.list[0].id;
            }
        });

    }

    /**
     * 支付
     * */
    buy() {
        if (!this.hasOldOrder) {
            // 之前没有创建订单，那么创建新的订单，创建订单后跳转到支付页面；
            this.createNewOrder().subscribe(resp => {
                if (resp.success) {
                    this.userSurveyId = resp.data.userSurveyId;
                    this.navigateToPayPage();
                }
            });
        } else {
            this.navigateToPayPage();
        }
    }

    /**
     * 跳转到支付页面
     * */
    navigateToPayPage() {
        this.router.navigate(['/pages/pay', this.userSurveyId]);
    }

    createNewOrder() {
        let order = new Order();
        order.payAmount = this.payAmount;
        order.balancePayAmount = this.balancePay;
        order.totalAmount = this.survey.price;
        order.userId = 1; // TODO: hardcoded
        order.businessId = this.surveyId;
        order.creatTime = new Date();
        order.orderStatus = 0;
        order.payType = 2;

        let orderVo = new OrderVo(order, {});

        return this.surveyService.createOrder(orderVo);
    }

    getHtml() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.survey.description);
    }
}
