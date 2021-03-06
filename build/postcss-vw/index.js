/**
 * @plugins postcss-px-to-viewport-lagou
 * @link  https://github.com/wangjinyang/postcss-px-to-viewport-lagou/blob/master/index.js
 * 新增忽略属性的值 Px
 */
var postcss = require('postcss');
var objectAssign = require('object-assign');
// const { parse } = require('postcss-values-parser');

var defaults = {
  unitToConvert: 'px',
  viewportHeight: 1366, // not now used; TODO: need for different units and math for different properties
  LibraryRate: 3,
  libraryRoot: 'node_modules',
  viewportUnit: 'vw',
  propertyBlacklist: [],
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false,
  unitPrecision: 3
};

module.exports = postcss.plugin('postcss-vw', function() {
  let options = defaults;
  var opts = objectAssign({}, {
    viewportWidth: 750
  }, options);
  var pxReplace = createPxReplace(opts.viewportWidth, opts.minPixelValue, opts.unitPrecision, opts.viewportUnit);

  // excluding regex trick: http://www.rexegg.com/regex-best-trick.html
  // Not anything inside double quotes
  // Not anything inside single quotes
  // Not anything inside url()
  // Any digit followed by px
  // !singlequotes|!doublequotes|!url()|pixelunit
  var pxRegex = new RegExp('"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + opts.unitToConvert, 'ig');

  const commentConvert =RegExp(/CSS PX TO VW \d+\\*/);;

  return function(css) {
    css.walkDecls(function(decl, i) {
      let cssStr = decl.source.input.css + '';
      let _comment = cssStr.match(commentConvert);
      if (!_comment) {
        return;
      }
      opts.viewportWidth = _comment[0].replace(/[^0-9]/ig, '');


      /*符合单位的属性才会转变值*/
      if (decl.value.indexOf('px') === -1) return;

      if (options.exclude && Array.isArray(options.exclude)) {
        if (excludePath(options.exclude, decl.source.input.file)) return;
      }
      // This should be the fastest test and will remove most declarations
      if (decl.value.indexOf(opts.unitToConvert) === -1) return;

      if (propertySelector(opts.propertyBlacklist, decl.prop)) return;

      if (blacklistedSelector(opts.selectorBlackList, decl.parent.selector)) return;

      var LibraryRate = isLibrary(opts.LibraryUI, decl.source.input.file, opts.libraryRoot) ? opts.LibraryRate : 1;

      decl.value = decl.value.replace(pxRegex, createPxReplace(opts.viewportWidth, opts.minPixelValue, opts.unitPrecision, opts.viewportUnit, LibraryRate));
    });

    if (opts.mediaQuery) {
      css.walkAtRules('media', function(rule) {
        if (rule.params.indexOf(opts.unitToConvert) === -1) return;
        rule.params = rule.params.replace(pxRegex, pxReplace);
      });
    }
  };
});

function createPxReplace (viewportSize, minPixelValue, unitPrecision, viewportUnit, LibraryRate) {
  return function(m, $1) {
    if (!$1) return m;
    var pixels = parseFloat($1);
    if (pixels <= minPixelValue) return m;
    return toFixed((pixels * LibraryRate / viewportSize * 100), unitPrecision) + viewportUnit;
  };
}

function toFixed (number, precision) {
  var multiplier = Math.pow(10, precision + 1), wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}

function blacklistedSelector (blacklist, selector) {
  if (typeof selector !== 'string') return;
  return blacklist.some(function(regex) {
    if (typeof regex === 'string') return selector.indexOf(regex) !== -1;
    return selector.match(regex);
  });
}

function propertySelector (blacklist, selector) {
  if (typeof selector !== 'string') return;
  return blacklist.some(function(regex) {
    if (typeof regex === 'string') return selector.indexOf(regex) !== -1;
    return selector.match(regex);
  });
}

function excludePath (exclude, path) {
  if (typeof path !== 'string') return;
  return exclude.some(function(regex) {
    if (typeof regex === 'string') return path.indexOf(regex) !== -1;
    return path.match(regex);
  });
}

function isLibrary (library, path, libraryRoot) {
  if (!library) return;
  var tempLibrary = '';
  if (typeof path !== 'string') return;
  if (typeof library === 'string') {
    tempLibrary = [libraryRoot, library].join('/');
    return path.indexOf(tempLibrary) !== -1;
  }
  if (Array.isArray(library)) {
    return library.some(function(regex) {
      tempLibrary = [libraryRoot, regex].join('/');
      if (typeof regex === 'string') return path.indexOf(tempLibrary) !== -1;
      return path.match(regex);
    });
  }
  return false;
}
