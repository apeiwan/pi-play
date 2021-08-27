export const preload = function(url) {
  const link=document.createElement('link');
  link.rel='prefetch'
  link.href=url;
  document.getElementsByTagName('head')[0].appendChild(link);
};
