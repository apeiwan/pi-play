let lockCount = 0;

export function lockClick(lock: boolean) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add('pi-play-spinner--unclickable');
    }

    lockCount++;
  } else {
    lockCount--;

    if (!lockCount) {
      document.body.classList.remove('pi-play-spinner--unclickable');
    }
  }
}
