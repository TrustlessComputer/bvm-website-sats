export const convertDayToSeconds = (day: number) => {
  if (!day || day === 0) return 0;
  return day * 24 * 60 * 60; //second
};

export const convertHoursToSeconds = (hours: number) => {
  if (!hours || hours === 0) return 0;
  return hours * 60 * 60; //second
};

export function secondsToDhms(second: string) {
  const seconds = Number(second);
  var y = Math.floor(seconds / (3600 * 24 * 12));
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var yDisplay = y > 0 ? y + (y == 1 ? ' year' : ' years') : undefined;
  var dDisplay = d > 0 ? d + (d == 1 ? ' day' : ' days') : undefined;
  var hDisplay = h > 0 ? h + (h == 1 ? ' hour' : ' hours') : undefined;
  var mDisplay = m > 0 ? m + (m == 1 ? ' minute' : ' minutes') : undefined;
  var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : undefined;

  let str = [yDisplay, dDisplay, hDisplay, mDisplay, sDisplay].filter(item => !!item).join(', ');
  return str;
}
