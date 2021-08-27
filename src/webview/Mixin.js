import { EVENT_NAME, EVENT_FORMAT_NAME, emitter } from './utils';

export default {
  data () {
    return {
      PIPIPLAYWEBVIEWMIXIN: true
    };
  },
  created () {
    for (let key in EVENT_NAME) {
      let eventName = EVENT_NAME[key];
      emitter.addListener(EVENT_FORMAT_NAME(eventName), data => {
        this[key] && this[key](data);
      });
    }
  }
};