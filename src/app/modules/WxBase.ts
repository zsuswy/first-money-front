import {Router} from '@angular/router';
import {WxService} from '../services/wx-service.service';
import {Cookie} from '../util/Cookie';

declare let wx: any;

export class WxBase {
    public userId: number;
    public wxOpenId: string;
    public debug = false;

    constructor(protected wxService: WxService, protected router: Router) {
        if (this.debug) {
            localStorage.setItem('userId', '11');
            localStorage.setItem('wxOpenId', 'oBCXTsiLb08hNJoc3Zi6vwFGQLoo');
            this.userId = Number(localStorage.getItem('userId'));
            this.wxOpenId = localStorage.getItem('wxOpenId');
        }
        else {
            let userId;
            let wxOpenId;
            // 获取微信用户信息，从Cookie里面获取后放入sessionStorage里面。
            if (localStorage.getItem('userId') == '-1') {
                userId = Cookie.getCookie('userId');
                wxOpenId = Cookie.getCookie('wxOpenId');

                localStorage.setItem('userId', userId);
                localStorage.setItem('wxOpenId', wxOpenId);
            } // 如果sessionStorage过期，那么重新获取
            else if (localStorage.getItem('userId') == null) {
                localStorage.setItem('userId', '-1');

                window.location.href = `http://quiz.ronmob.com/qz/wx/getUserInfo?retUrl=${encodeURI(router.url)}`;
            }

            this.userId = Number(localStorage.getItem('userId'));
            this.wxOpenId = localStorage.getItem('wxOpenId');

            // 注册微信分享配置
            if (sessionStorage.getItem('wx_config_' + router.url) == null) {
                this.configWxShare();
                sessionStorage.setItem('wx_config_' + router.url, '1');
            }
        }
    }

    /**
     * 通过config接口注入权限验证配置
     * */
    private configWxShare() {
        this.wxService.createJsapiSignature(window.location.href).subscribe(resp => {
            wx.config({
                // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: resp.data.appId, // 必填，公众号的唯一标识
                timestamp: resp.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: resp.data.nonceStr, // 必填，生成签名的随机串
                signature: resp.data.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
    }

    /**
     * 绑定分享事件
     * */
    public registerWxShare(title?: string, desc?: string, imgUrl?: string) {
        let _this = this;
        let link = 'http://quiz.ronmob.com/qz/mobile/#' + this.router.url + '/' + this.userId;
        wx.onMenuShareAppMessage({
            title: title || '', // 分享标题
            desc: desc || '', // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl || '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                _this.OnWxShareSuccess();
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                _this.OnWxShareCancel();
                // 用户取消分享后执行的回调函数
            }
        });
    }

    protected OnWxShareSuccess() {
    }

    protected OnWxShareCancel() {
    }
}