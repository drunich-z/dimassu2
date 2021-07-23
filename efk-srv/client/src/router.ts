import Controller from './contoller';

function getRouteInfo(): string {
  const hash = window.location.hash ? window.location.hash.slice(1) : '';
  const [name] = hash.split('/');

  return name;
}

function handleHash(): void {
  const name = getRouteInfo();

  if (name) {
    if (name === 'main') Controller.mainRoute();
    if (name === 'category') Controller.categoryRoute();
    if (name === 'statistics') Controller.statisticsRoute();
    if (name === 'admin') Controller.adminRoute();
  }
}

export default {
  async init():Promise<void> {
    window.addEventListener('hashchange', handleHash);
    window.location.hash = 'main';
    handleHash();
  },
};
