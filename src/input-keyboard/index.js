import { isIOS } from '../utils/validate/system';
import {createNamespaceStr} from "../utils";

const [name]=createNamespaceStr('input-keyboard');


const InputKeyboard={
  name,
};

const directive={
  bind(el) {
    if (isIOS) {
      let timer = null;
      el.addEventListener('blur', () => {
        // eslint-disable-next-line no-unused-expressions
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      }, false);
    }
  }
};


// eslint-disable-next-line func-names
InputKeyboard.install = function (app) {
  app.directive(name, directive);
};

export default InputKeyboard;
export {
  InputKeyboard,
};

