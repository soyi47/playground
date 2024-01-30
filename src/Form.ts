interface FormConstructorParams {
  onCarNamesSubmit: (carNames: string[]) => void;
  onTurnCountSubmit: (turnCount: number) => void;
}

class Form {
  private carNamesForm: HTMLFormElement | null;
  private turnCountForm: HTMLFormElement | null;

  constructor({ onCarNamesSubmit, onTurnCountSubmit }: FormConstructorParams) {
    this.carNamesForm = document.getElementById('car-names-form') as HTMLFormElement | null;

    this.carNamesForm?.addEventListener('submit', function (this, event) {
      event.preventDefault();

      const carNamesInput = this.elements.namedItem('car-names-input') as HTMLInputElement | null;
      const carNames = carNamesInput?.value ? carNamesInput?.value.split(',') : '';

      if (!carNames) {
        alert('자동차 이름을 입력해주세요.');
        return;
      }

      onCarNamesSubmit(carNames);
    });

    this.turnCountForm = document.getElementById('turn-count-form') as HTMLFormElement | null;
    this.turnCountForm?.addEventListener('submit', function (this, event) {
      event.preventDefault();

      const turnCountInput = this.elements.namedItem('turn-count-input') as HTMLInputElement | null;
      const turnCount = turnCountInput?.valueAsNumber!;

      if (!turnCount) {
        alert('시도 횟수를 입력해주세요.');
        return;
      }

      onTurnCountSubmit(turnCount);
    });
  }

  init() {
    const carNamesInput = this.carNamesForm!.elements.namedItem(
      'car-names-input'
    ) as HTMLInputElement;

    carNamesInput.value = '';

    const turnCountInput = this.turnCountForm!.elements.namedItem(
      'turn-count-input'
    ) as HTMLInputElement;

    turnCountInput.value = '';
  }
}

export default Form;
