/**
 * 页面生命周期使用
 */
const hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

const methods = {
  pageHideBefore(event) {
    this.pageHideTimestamp = event.timeStamp;
    this.pageVisible = false;
    this.pageHide();
  },
  pageShowBefore(event) {
    if (this.pageShowTimestamp) {
      this.pageShowTimestamp = event.timeStamp;
      this.pageVisible = true;
      this.pageShow();
    } else {
      this.pageShowTimestamp = event.timeStamp;
    }
  },
  pageHide() {

  },
  pageShow() {

  },
  onVisibilityChange() {
    if (!document[hiddenProperty]) {
      this.pageVisible = true;
      this.pageShow();
    } else {
      this.pageVisible = false;
      this.pageHide();
    }
  }
};

const data = function () {
  return {
    pageHideTimestamp: '',
    pageShowTimestamp: '',
    pageVisible: true
  };
};

const created = function () {
  window.addEventListener('pageshow', this.pageShowBefore, false);
  window.addEventListener('pagehide', this.pageHideBefore, false);
  document.addEventListener(visibilityChangeEvent, this.onVisibilityChange, false);
};

export default {
  methods,
  created,
  data
};
