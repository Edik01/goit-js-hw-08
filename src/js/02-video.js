import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const player = new Player(`vimeo-player`);

const STORAGE_KEY = 'videoplayer-current-time';
player.on('timeupdate', throttle(onTimeupdate, 500));

function onTimeupdate(time) {
  localStorage.setItem(STORAGE_KEY, time.seconds);
}

const time = localStorage.getItem(STORAGE_KEY) || 0;
player.setCurrentTime(time);
