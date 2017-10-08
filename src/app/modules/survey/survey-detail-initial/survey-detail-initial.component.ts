import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {Survey} from '../../../model/Survey';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Order} from '../../../model/Order';
import {User} from '../../../model/User';
import {OrderVo} from '../../../model/OrderVo';
import {ListSearchVo} from '../../../model/common/ListSearchVo';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';

@Component({
    templateUrl: './survey-detail-initial.component.html'
})
export class SurveyDetailInitialComponent extends WxBase implements OnInit, AfterViewInit {
    survey = new Survey();
    surveyId: number;

    fromUserId: number;

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

    constructor(private surveyService: SurveyService,
                private route: ActivatedRoute,
                protected router: Router,
                private domSanitizer: DomSanitizer,
                protected wxService: WxService) {
        super(wxService, router);
        this.user = new User();
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.surveyId = Number(params.get("surveyId"));
            this.fromUserId = Number(params.get("fromUserId"));

            this.surveyService.getSurvey(this.surveyId).subscribe(resp => {
                this.survey = resp.data;

                this.balancePay = this.survey.price > this.survey.price ? this.user.balance : this.survey.price;
                this.payAmount = this.survey.price - this.balancePay;

                this.registerWxShare(this.survey.title, this.survey.shortDescription, this.survey.image);
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
        this.router.navigate(['/pay', this.userSurveyId]);
    }

    createNewOrder() {
        let order = new Order();
        order.payAmount = this.payAmount;
        order.balancePayAmount = this.balancePay;
        order.totalAmount = this.survey.price;
        order.userId = this.userId;
        order.wxOpenId = this.wxOpenId;
        order.businessId = this.surveyId;
        order.creatTime = new Date();
        order.orderStatus = 0;
        order.payType = 2;

        let orderVo = new OrderVo(order, {fromUserId: this.fromUserId});

        return this.surveyService.createOrder(orderVo);
    }

    getHtml() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.survey.description);
    }

    test() {
        this.surveyService.shareSurvey(this.surveyId).subscribe(resp => {

        });
    }

    protected OnWxShareSuccess() {
        this.surveyService.shareSurvey(this.surveyId).subscribe(resp => {

        });
    }

    protected OnWxShareCancel() {
        alert('from child cancel');
    }
}
