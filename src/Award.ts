interface AwardConstructorParams {
  onRestart: () => void;
}

class Award {
  private container = document.getElementById('award') as HTMLDivElement;
  private winnerNameText: HTMLParagraphElement;
  private restartButton!: HTMLButtonElement;

  constructor({ onRestart }: AwardConstructorParams) {
    this.winnerNameText = document.createElement('p');

    this.createRestartButton({ onRestart });
  }

  init() {
    this.container.innerHTML = '';
  }

  createRestartButton({ onRestart }: AwardConstructorParams) {
    this.restartButton = document.createElement('button');
    this.restartButton.innerText = '다시 시작하기';
    this.restartButton.addEventListener('click', function () {
      onRestart();
    });
  }

  showWinner(winnerNames: string[]) {
    this.winnerNameText.innerText = `🏆 최종 우승자: ${winnerNames.join(', ')} 🏆`;

    this.container.appendChild(this.winnerNameText);
    this.container.appendChild(this.restartButton);
  }
}

export default Award;
