import Header from './main.vue';

// eslint-disable-next-line func-names
Header.install = function (app) {
  app.component(Header.name, Header);
};

export default Header;
export {
  Header,
};
