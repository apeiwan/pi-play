import Vue from 'vue'
import {Button, Cell,Tabs,Tab,Grid,GridItem,Field,Picker} from 'vant'
import PiPlayHeader from '../../src/header'
import PiPlayButton from '../../src/button'
import Toast from '../../src/toast'
import PiPlayList from '../../src/list'
import PiPlayPopup from '../../src/popup'
import PiPlayLoading from '../../src/loading'
import PiPlayOverlay from '../../src/overlay'
import PiPlayIcon from '../../src/icon'
import PiPlayDialog from '../../src/dialog'
import PiPlayGoodsAction from '../../src/goods-action'
import PiPlayGoodsActionButton from '../../src/goods-action-button'
import PiPlayPullRefresh from '../../src/pull-refresh'
import PiPlayPopover from '../../src/popover'
import PiPlaySticky from '../../src/sticky'
import PiPlayCountDown from '../../src/count-down'
import PiPlayActionSheet from '../../src/action-sheet'
import PiPlayInputKeyboard from '../../src/input-keyboard'
import PiPlaySpinner from '../../src/spinner'
import PiPlayWebview from '../../src/webview'
import PiPlaySign from '../../src/sign'
Vue.use(Button)
Vue.use(Picker)
Vue.use(Field)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(Toast)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(PiPlayHeader)
Vue.use(PiPlayButton)
Vue.use(PiPlayList)
Vue.use(PiPlayPullRefresh)
Vue.use(PiPlayPopup)
Vue.use(PiPlayOverlay)
Vue.use(PiPlayIcon)
Vue.use(PiPlayLoading)
Vue.use(PiPlayDialog)
Vue.use(PiPlayGoodsAction)
Vue.use(PiPlayGoodsActionButton)
Vue.use(PiPlayPopover)
Vue.use(PiPlaySticky)
Vue.use(PiPlayCountDown)
Vue.use(PiPlayActionSheet)
Vue.use(PiPlayInputKeyboard)
Vue.use(PiPlaySpinner)
Vue.use(PiPlayWebview.Component)
Vue.use(PiPlaySign)

const isWeapp = location.search.indexOf('weapp=1') !== -1;
const ua = navigator.userAgent.toLowerCase();
const isMobile = /ios|iphone|ipod|ipad|android/.test(ua);

if (isWeapp) {
  const style = document.createElement('style');
  style.textContent = `.hide-in-weapp { display: none }`;
  document.head.appendChild(style);
}
export default {
  data(){
    return {
      screen:isMobile ? window.screen : {
        height:640,
        width:360
      }
    }
  },
  computed: {
    isWeapp() {
      return isWeapp;
    },
  },
}
