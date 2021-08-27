export const scrollListener = {
  scrollEl: null,
  /**
   * 滚动绑定
   * @param handle
   * @param {{debounce: number}} params
   * @param {number=} params.debounce
   * @param {HTMLElement} params.scrollEl
   * @param {HTMLElement=} params.contentEl
   */
  handle: null,
  bind(handle, params) {
    const opts = {
      debounce: 200,
      ...params,
    };
    // 浏览器视口的高度
    // let windowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 文档的总高度
    // eslint-disable-next-line max-len
    // let documentScrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    // 滚动条在Y轴上的滚动距离
    // let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const { contentEl } = opts;
    const { scrollEl } = opts;
    this.scrollEl = scrollEl;

    this.handle = function () {
      // 内容的实际高度
      let contentClientHeight = contentEl ? contentEl.clientHeight : scrollEl.scrollHeight;
      // 滚动条在Y轴上的滚动距离
      let { scrollTop } = scrollEl;
      if (scrollEl.location) {
        contentClientHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      }
      // eslint-disable-next-line no-unused-expressions
      handle && handle({
        windowClientHeight: scrollEl.clientHeight,
        contentClientHeight,
        isScrollBottom: (scrollTop + scrollEl.clientHeight + 10) >= contentClientHeight,
        scrollTop,
        contentEl,
        scrollEl,
      });
    };

    scrollEl.addEventListener('scroll', this.handle, false);
  },
  remove() {
    this.scrollEl && this.scrollEl.removeEventListener('scroll', this.handle);
  },
};

export default scrollListener;
