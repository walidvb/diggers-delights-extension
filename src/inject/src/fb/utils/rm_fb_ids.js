export function rmFclid(href) {
  var a = document.createElement('a');
  a.href = href;
  var param = 'fbclid';
  if (a.search.indexOf(param + '=') !== -1) {
    var replace = '';
    try {
      var url = new URL(a);
      url.searchParams.delete(param);
      replace = url.href;
    } catch (ex) {
      var regExp = new RegExp('[?&]' + param + '=.*');
      replace = a.search.replace(regExp, '');
      replace = a.pathname + replace + a.hash;
    }
    return replace
  }
};