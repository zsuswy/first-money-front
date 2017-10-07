import {Router} from '@angular/router';
import {WxService} from '../services/wx-service.service';
import {Cookie} from '../util/Cookie';

declare let wx: any;

export class WxBase {
    constructor(protected wxService: WxService, protected router: Router) {
        // 获取微信用户信息
        if (Cookie.getCookie('userId') == null) {
            window.location.href = `http://quiz.ronmob.com/qz/wx/getUserInfo?retUrl=${encodeURI(router.url)}`;
        } else {
            alert(Cookie.getCookie('userId'));
        }

        // 注册微信分享配置
        if (localStorage.getItem('wx_config_' + router.url) == null) {
            this.configWxShare();
            localStorage.setItem('wx_config_' + router.url, '1');
        }
    }

    /**
     * 通过config接口注入权限验证配置
     * */
    private configWxShare() {
        this.wxService.createJsapiSignature(window.location.href).subscribe(resp => {
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: resp.data.appId, // 必填，公众号的唯一标识
                timestamp: resp.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: resp.data.nonceStr, // 必填，生成签名的随机串
                signature: resp.data.timestamp,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
    }

    /**
     * 绑定分享事件
     * */
    public registerWxShare(title?: string, desc?: string, link?: string, imgUrl?: string) {
        let _this = this;

        wx.onMenuShareAppMessage({
            title: title || '', // 分享标题
            desc: desc || '', // 分享描述
            link: link || '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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