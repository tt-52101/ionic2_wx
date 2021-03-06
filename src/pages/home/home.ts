import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {HttpService} from "../../providers/HttpService";
import {Response} from "@angular/http";
declare var wx;
declare var QRCode;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('qrcode') qrcode: ElementRef;
  QRCode: any;

  constructor(private navCtrl: NavController,
              private app: App,
              private httpService: HttpService) {

  }

  ionViewWillEnter() {
    //http://davidshimjs.github.io/qrcodejs/
    this.QRCode = new QRCode(this.qrcode.nativeElement, {
      width: 100,
      height: 100
    });
  }

  ionViewDidEnter() {
    this.app.setTitle('首页');
  }

  goPageJsSdk() {
    this.navCtrl.push('WxJssdk');
  }

  id: string;

  click2() {
    this.httpService.get(`/custom/order/${this.id}/wx/pay`).map((res: Response) => res.json()).subscribe(json => {
      wx.chooseWXPay({
        timestamp: json.timeStamp,
        nonceStr: json.nonceStr,
        package: json.package,
        signType: 'MD5',
        paySign: json.paySign,
        success: function (res) {
          // 支付成功后的回调函数
          console.log('操作成功，因与微信服务器数据通信存在延时，充值结果可能无法马上显示，如果没显示您充值成功的结果，请稍等几分再查看');
        }
      });
    });
  }

  makeCode(value) {
    this.QRCode.makeCode(value);
  }


}
