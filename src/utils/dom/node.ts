export function removeNode(el: Node) {
  const parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}

export function getElement(el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }

  return el();
}
