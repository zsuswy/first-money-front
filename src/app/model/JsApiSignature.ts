export class JsApiSignature {
    constructor(public appId?: string,
                public nonceStr?: string,
                public timestamp?: number,
                public url?: string,
                public signature?: string,) {
    }
}