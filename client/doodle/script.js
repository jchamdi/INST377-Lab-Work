document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const doodlerLeftSpace = 50;
  const doodlerRightSpace = 150;
  const isGameOver = false;
  const platformCount = 5;
  const platforms = [];


function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add('doodler');
  doodler.style.left = `${doodlerLeftSpace}px`;
  doodler.style.bottom = `${doodlerBottomSpace}px`;
}
createDoodler(){

})
/*
class Platform {
  constructor(newPlatBottom) {
    this.bottom = newPlatBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement('div');

    const {visual} = this;
    visual.classList.add('platform');
    visual.style.left = `${this.left}px`;
    visual.style.bottom = `${this.bottom}px`;
    grid.appendChild(visual);
  }
}
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    const platGap = 600 / platformCount;
    const newPlatBottom = 100 + i * platGap;
    const newPlatform = new Platform(newPlatBottom);
    platforms.push(newPlatform);
    console.log(platforms);
  }
}
function start() {
  if (!isGameOver) {
    createDoodler();
    createPlatforms();
  }
*/