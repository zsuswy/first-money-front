import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {Survey} from '../../../model/Survey';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Order} from '../../../model/Order';
import {User} from '../../../model/User';
import {ListSearchVo} from '../../../model/common/ListSearchVo';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';

declare let WeixinJSBridge: any;


@Component({
    templateUrl: './survey-detail-initial.component.html'
})
export class SurveyDetailInitialComponent extends WxBase implements OnInit {
    survey: Survey;
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
     * 积分抵扣金额
     * */
    scorePay: number;

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
        this.survey = new Survey();
    }

    ngOnInit(): void {
        Observable.zip(this.route.paramMap, this.route.queryParamMap).subscribe(params => {
            // 获取参数
            this.surveyId = Number(params[0].get("surveyId"));
            this.fromUserId = Number(params[1].get("fromUserId")); // 默认为0

            // 查询是是否存在已经有的订单
            let listSearchVo = new ListSearchVo();
            listSearchVo.page = null;
            listSearchVo.params = {userId: this.userId, surveyId: this.surveyId, status: 0};

            Observable.zip(this.surveyService.getSurvey(this.surveyId),
                this.surveyService.getOrderList(listSearchVo),
                this.surveyService.getUser(this.userId))
                .subscribe(respList => {
                    this.survey = respList[0].data;
                    let exsitOrder = respList[1].data;
                    this.user = respList[2].data;

                    this.calculateScoreBalance();

                    // 设置微信分享的标题、连接、图片
                    this.registerWxShare(this.survey.title, this.survey.shortDescription, this.survey.image);

                    if (exsitOrder != null && exsitOrder.list.length > 0) {
                        this.hasOldOrder = true;
                        this.userSurveyId = respList[1].data.list[0].id;
                    }
                });
        });
    }

    /**
     * 计算订单余额、积分支付的金额
     * */
    calculateScoreBalance() {
        // 没有余额和积分，那么直接微信支付，不需要跳到支付页面
        if (this.user.score < 0.1 && this.user.balance < 0.1) {
            this.wxPay();
        } else {
            // 计算 余额、积分 支付金额
            if (this.user.score > 0.1) {
                this.scorePay = this.survey.price > this.user.score ? this.user.score : this.survey.price;
            } else {
                this.scorePay = 0;
            }

            if (this.user.balance > 0.1) {
                this.balancePay = this.survey.price - this.scorePay > this.user.balance ? this.user.balance : this.survey.price - this.scorePay;
            } else {
                this.balancePay = 0;
            }

            this.payAmount = this.survey.price - this.scorePay - this.balancePay;
        }
    }

    /**
     * 微信支付
     * */
    wxPay() {
        let ng_this = this;

        this.createOrder().subscribe(resp => {
            let payInfo = resp.data;

            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": payInfo.appId,             // "wx2421b1c4370ec43b",     //公众号名称，由商户传入
                    "timeStamp": payInfo.timeStamp,     // "1395712654",         //时间戳，自1970年以来的秒数
                    "nonceStr": payInfo.nonceStr,       // "e61463f8efa94090b1f366cccfbbb444", //随机串
                    "package": payInfo.package,         //"prepay_id=u802345jgfjsdfgsdg888",
                    "signType": "MD5",                  //微信签名方式：
                    "paySign": payInfo.paySign          // "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
                },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // 支付成功，跳转
                        ng_this.surveyService.getUserSurveyList({
                            page: null,
                            params: {'orderId': payInfo.orderId}
                        }).subscribe(resp => {
                            ng_this.router.navigate(["/survey-do/", resp.data.list[0].id]);
                        });
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
        });
    }

    /**
     * 支付
     * */
    buy() {
        if (!this.hasOldOrder) {
            // 之前没有创建订单，那么创建新的订单，创建订单后跳转到支付页面；
            this.createOrder().subscribe(resp => {
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

    payTest() {

    }

    createOrder() {
        let order = new Order();
        order.payAmount = this.payAmount;
        order.balancePayAmount = this.balancePay;
        order.totalAmount = this.survey.price;
        order.scorePayAmount = this.scorePay;
        order.userId = this.userId;
        order.wxOpenId = this.wxOpenId;
        order.surveyId = this.surveyId;
        order.creatTime = new Date();
        order.orderStatus = 0;
        order.payType = 2;
        order.fromUserId = this.fromUserId;

        return this.surveyService.createOrder(order);
    }

    getHtml() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.survey.description);
    }

    /**
     * 分享成功后的接口
     * */
    protected OnWxShareSuccess() {
        this.surveyService.shareSurvey(this.surveyId).subscribe(resp => {

        });
    }

    /**
     * 取消分享的回调
     * */
    protected OnWxShareCancel() {
    }
}
