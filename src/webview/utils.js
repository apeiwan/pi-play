import { EventEmitter } from 'fbemitter';

export const emitter = new EventEmitter();

export const EVENT_NAME = {
  onReady: 'ready',
  onNotApp: 'notApp',
  onApp: 'app',
  onLoginSuccess: 'loginSuccess',
  onLoginCancel: 'loginCancel',
  onSignAvailable: 'signAvailable',
  onSignUnavailable: 'signUnavailable'
};

export const EVENT_FORMAT_NAME = function(name) {
  return `PiPlayWebview${name}`;
};