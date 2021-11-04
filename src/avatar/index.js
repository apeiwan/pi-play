/*
 * @Author: 伽蓝
 * @Date: 2021-10-15 15:35:23
 * @LastEditTime: 2021-10-20 11:14:01
 * @LastEditors: 伽蓝
 * @FilePath: /pi-play/src/vap/index.js
 * @Description: 
 * 代码不规范,调试泪两行
 */
import PiVap from './main'

require('./dll/vap.min.js')

PiVap.install = function (app) {
  app.component(PiVap.name, PiVap);
};

export default PiVap;
export {
  PiVap
}
