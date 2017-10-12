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

declare let WeixinJSBridge: any;

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
     * 已有订单号
     * */
    orderId: number;

    /**
     * 当前问卷
     * */
    survey: Survey;

    order: Order;

    userSurveyId: number;
    /**
     * 当前用户
     * */
    user: User;

    constructor(private surveyService: SurveyService,
                private route: ActivatedRoute,
                protected router: Router,
                protected wxService: WxService) {
        super(wxService, router);
        this.survey = new Survey();
        this.order = new Order();
    }

    ngOnInit() {
        // 获取参数
        Observable.zip(this.route.paramMap, this.route.queryParamMap)
            .subscribe(paramsArr => {
                this.surveyId = Number(paramsArr[0].get('surveyId'));

                Observable.forkJoin(this.surveyService.getSurvey(this.surveyId),    // 获取 Survey
                    this.surveyService.getOrderList({
                        page: null,
                        params: {'userId': this.userId, 'status': 0, 'surveyId': this.surveyId}
                    }))
                    .subscribe(respList => {
                        this.survey = respList[0].data;
                        this.order = respList[1].data.list[0];
                        if (this.order == null) {
                            // TODO: 没有相关订单，跳转到其它页面
                        }
                    });
            });
    }

    /**
     * 确定支付
     * */
    pay() {
        let order = new Order();
        order.surveyId = this.surveyId;
        order.userId = this.userId;

        // all——全微信支付  partial——部分余额、积分支付，部分微信支付   none——全部积分、余额支付，不需要微信支付
        this.surveyService.createOrGetOrderPayInfo(order).subscribe(resp => {
            this.userSurveyId = resp.data.userSurveyId;

            if (resp.data.wxpPayType == "all" || resp.data.wxpPayType == "partial") {
                let payInfo = resp.data.payInfo;

                this.wxPay(payInfo);
            } else if (resp.data.wxpPayType == "none") {
                order = resp.data.order;
                this.surveyService.confirmOrder(order.id).subscribe(resp => {
                    if (resp.success) {
                        this.router.navigate(['/survey-do', this.userSurveyId]);
                    }
                });
            }
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
                "package": payInfo.package,         // "prepay_id=u802345jgfjsdfgsdg888",
                "signType": "MD5",                  // 微信签名方式：
                "paySign": payInfo.paySign          // "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
            },
            function (res) {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 支付成功，跳转
                    ng_this.router.navigate(['/survey-do', this.userSurveyId]);
                }
            }
        );
    }

}
