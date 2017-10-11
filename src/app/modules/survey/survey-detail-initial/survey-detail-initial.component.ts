import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {Survey} from '../../../model/Survey';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Order} from '../../../model/Order';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import {User} from '../../../model/User';

declare let WeixinJSBridge: any;


@Component({
    templateUrl: './survey-detail-initial.component.html'
})
export class SurveyDetailInitialComponent extends WxBase implements OnInit {
    survey: Survey;

    user: User;

    surveyId: number;

    fromUserId: number;

    constructor(private surveyService: SurveyService,
                private route: ActivatedRoute,
                protected router: Router,
                private domSanitizer: DomSanitizer,
                protected wxService: WxService) {
        super(wxService, router);
        this.survey = new Survey();
    }

    ngOnInit(): void {
        Observable.zip(this.route.paramMap, this.route.queryParamMap).subscribe(params => {
            // 获取参数
            this.surveyId = Number(params[0].get("surveyId"));
            this.fromUserId = Number(params[1].get("fromUserId")); // 默认为0

            Observable.zip(this.surveyService.getSurvey(this.surveyId),
                this.surveyService.getUser(this.userId))
                .subscribe(respList => {
                    this.survey = respList[0].data;
                    this.user = respList[1].data;

                    // 设置微信分享的标题、连接、图片
                    this.registerWxShare(this.survey.title, this.survey.shortDescription, this.survey.image);
                });
        });
    }

    /**
     * 微信支付
     * */
    wxPay(payInfo) {
        let ng_this = this;

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
                        ng_this.router.navigate(["/survey-do/", resp.data.list[0].id],
                            {queryParams: {'surveyId': ng_this.surveyId}});
                    });
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );

    }

    /**
     * 支付
     * */
    buySurvey() {
        // 之前没有创建订单，那么创建新的订单，创建订单后跳转到支付页面；
        this.createOrGetOrderPayInfo().subscribe(resp => {
            if (resp.success) {
                if (resp.data.wxpPayType != "all") {
                    console.log('navigate');
                    this.navigateToPayPage();
                } else { // 如果没有积分和余额，就直接支付
                    this.wxPay(resp.data.payInfo);
                }
            }
        });
    }

    /**
     * 跳转到支付页面
     * */
    navigateToPayPage() {
        this.router.navigate(['/pay', this.surveyId]);
    }

    /**
     * 创建新订单
     * */
    createOrGetOrderPayInfo() {
        let order = new Order();
        order.userId = this.userId;
        order.wxOpenId = this.wxOpenId;
        order.surveyId = this.surveyId;
        order.fromUserId = this.fromUserId;

        return this.surveyService.createOrGetOrderPayInfo(order);
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
