/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from '@angular/core';

import {NativeService} from "./NativeService";

/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()
export class Helper {

  constructor(private nativeService: NativeService) {
  }

}
