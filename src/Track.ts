class Track {
  private playground = document.getElementById('play-ground') as HTMLDivElement | null;
  private container = document.createElement('div');
  private nameContainer = document.createElement('span');
  private processContainer = document.createElement('p');

  constructor(name: string) {
    if (!this.playground) {
      throw Error('id가 play-ground인 요소를 찾을 수 없습니다.');
    }

    this.container.setAttribute('class', 'track');
    this.nameContainer.setAttribute('class', 'car-name');
    this.processContainer.setAttribute('class', 'car-process');

    const nameTextNode = document.createTextNode(name);
    this.nameContainer.appendChild(nameTextNode);

    this.container.appendChild(this.nameContainer);
    this.container.appendChild(this.processContainer);
    this.playground.appendChild(this.container);
  }

  processForward(): void {
    const arrowTextNode = document.createTextNode('↓');
    const arrowContainer = document.createElement('span');
    arrowContainer.appendChild(arrowTextNode);

    this.processContainer.appendChild(arrowContainer);
  }
}

export default Track;
