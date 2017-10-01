/**
 * Created by sunwuyang on 17/7/30.
 */
export class Order {
    constructor(public id?: number,
                public wxOrderNo?: string,
                public outTradeNo?: string,
                public payAmount?: number,
                public wxOpenId?: string,
                public scorePayAmount?: number,
                public orderStatus?: number,
                public creatTime?: Date,
                public finishTime?: Date,
                public userId?: number,
                public payType?: number,
                public businessId?: number,
                public totalAmount?: number,
                public balancePayAmount?: number) {
    }
}