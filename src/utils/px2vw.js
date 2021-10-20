/*
 * @Author: 伽蓝
 * @Date: 2021-06-28 14:47:16
 * @LastEditTime: 2021-10-15 17:21:07
 * @LastEditors: 伽蓝
 * @FilePath: /pi-mobile/src/utils/px2vw.js
 * @Description: 
 * 代码不规范,调试泪两行
 */
const config = {
  viewportWidth: 750, // 默认设计稿宽度
  unitPrecision: 5, // 精度
  viewportUnit: 'vw', // 单位
  minPixelValue: 1, // 最小宽度
};

const $toFixed = function (number, precision) {
  // eslint-disable-next-line no-restricted-properties
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
};

const createPxReplace = function (px) {
  if (!px) return '';
  const pixels = parseFloat(px);
  if (pixels <= config.minPixelValue) return px;
  const parsedVal = $toFixed((pixels / config.viewportWidth * 100), config.unitPrecision);
  return parsedVal === 0 ? '0' : parsedVal + config.viewportUnit;
};

/**
 * params Object || String
 */
export default (params) => {
  const type = typeof params === 'string' || typeof params === 'number';
  if(!type) throw new Error('请传入字符串或数字')
  return createPxReplace(params);
};
