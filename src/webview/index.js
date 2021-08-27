// eslint-disable-next-line import/no-named-as-default

import VueWebview from './Webview';
import VueWebviewMixin from './Mixin';
import { isServer } from '../utils';
import {  emitter } from './utils';
import Vue from 'vue';

let instance;

const defaultOptions = {
  autoReady: false,
  forciblyLogin: false,
  debugConfig: null,
};

function isInDocument(element) {
  return document.body.contains(element);
}

function initInstance() {
  if (instance) {
    instance.$destroy();
  }

  instance = new (Vue.extend(VueWebview))({
    el: document.createElement('div'),
    // avoid missing animation when first rendered
    propsData: {
      lazyRender: false,
    },
  });

  return instance
}

function Webview (options = {}) {
  if (!instance || !isInDocument(instance.$el)) {
    initInstance();
  }

  options = {
    ...defaultOptions,
    ...options
  };

  Object.assign(webview, options);

  return initInstance;
}

Webview.install = (app) => {
  app.use(VueWebview);
};

Webview.login = function() {
  emitter.emit('PiPlayWebviewOpenLogin');
};

Webview.Mixin = VueWebviewMixin;

Webview.Component = VueWebview;

Vue.prototype.$webview = Webview;

export default Webview;
