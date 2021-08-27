import Vue from 'vue';
// eslint-disable-next-line import/no-named-as-default
import VueSpinner from './Spinner';
import { isObject, isServer } from '../utils';
import { removeNode } from '../utils/dom/node';

require('./img').PRELOAD_IMG();

const defaultOptions = {
  type: 'loading',
  // @deprecated
  mask: false,
  value: false,
  message: '',
  className: '',
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 0,
  position: 'middle',
  transition: 'pi-play-fade',
  forbidClick: true,
  getContainer: 'body',
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false
};

// default options of specific type
let defaultOptionsMap = {};

let queue = [];
let multiple = false;
let currentOptions = {
  ...defaultOptions
};

function parseOptions (message) {
  if (isObject(message)) {
    return message;
  }

  return { message };
}

function isInDocument (element) {
  return document.body.contains(element);
}

function createInstance () {
  /* istanbul ignore if */
  if (isServer) {
    return {};
  }

  queue = queue.filter(
    (item) => !item.$el.parentNode || isInDocument(item.$el)
  );

  if (!queue.length || multiple) {
    const spinner = new (Vue.extend(VueSpinner))({
      el: document.createElement('div')
    });

    spinner.$on('input', (value) => {
      spinner.value = value;
    });

    queue.push(spinner);
  }

  return queue[queue.length - 1];
}

// transform spinner options to popup props
function transformOptions (options) {
  return {
    ...options,
    overlay: options.mask || options.overlay,
    mask: undefined,
    duration: undefined
  };
}

function Spinner (options = {}) {
  const spinner = createInstance();

  // should add z-index if previous spinner has not disappeared
  if (spinner.value) {
    spinner.updateZIndex();
  }

  options = parseOptions(options);
  options = {
    ...currentOptions,
    ...defaultOptionsMap[options.type || currentOptions.type],
    ...options,
    value: true
  };

  if (process.env.NODE_ENV === 'development' && options.mask) {
    console.warn(
      '[PiPlay] Spinner: "mask" option is deprecated, use "overlay" option instead.'
    );
  }

  options.clear = () => {
    spinner.value = false;

    if (options.onClose) {
      options.onClose();
      options.onClose = null;
    }

    if (multiple && !isServer) {
      spinner.$on('closed', () => {
        clearTimeout(spinner.timer);
        queue = queue.filter((item) => item !== spinner);

        removeNode(spinner.$el);
        spinner.$destroy();
      });
    }
  };

  Object.assign(spinner, transformOptions(options));
  clearTimeout(spinner.timer);

  if (options.duration > 0) {
    spinner.timer = setTimeout(() => {
      spinner.clear();
    }, options.duration);
  }

  return spinner;
}

const createMethod = (type) => (options) => Spinner({
  type,
  value: true,
  ...parseOptions(options)
});

['loading', 'indicator'].forEach((method) => {
  Spinner[method] = createMethod(method);
});

Spinner.clear = (all) => {
  if (queue.length) {
    if (all) {
      queue.forEach((spinner) => {
        spinner.clear();
      });
      queue = [];
    } else if (!multiple) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

Spinner.setDefaultOptions = (type, options) => {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options;
  } else {
    Object.assign(currentOptions, type);
  }
};

Spinner.resetDefaultOptions = (type) => {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = { ...defaultOptions };
    defaultOptionsMap = {};
  }
};

Spinner.allowMultiple = (value = true) => {
  multiple = value;
};

Spinner.install = (app) => {
  app.use(VueSpinner);
};

Vue.prototype.$spinner = Spinner;

export default Spinner;

