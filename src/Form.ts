import { validateCarNames, validateTurnCount } from './utils/validation';

interface FormConstructorParams {
  onCarNamesSubmit: (carNames: string[]) => void;
  onTurnCountSubmit: (turnCount: number) => void;
}

class Form {
  private carNamesForm: HTMLFormElement | null;
  private turnCountForm: HTMLFormElement | null;

  constructor({ onCarNamesSubmit, onTurnCountSubmit }: FormConstructorParams) {
    this.carNamesForm = document.getElementById('car-names-form') as HTMLFormElement | null;
    this.turnCountForm = document.getElementById('turn-count-form') as HTMLFormElement | null;

    this.addCarNamesEventListener(onCarNamesSubmit);
    this.addTurnCountEventListener(onTurnCountSubmit);
  }

  private addCarNamesEventListener(onCarNamesSubmit: FormConstructorParams['onCarNamesSubmit']) {
    this.carNamesForm?.addEventListener('submit', function (this, event) {
      event.preventDefault();

      const carNamesInput = this.elements.namedItem('car-names-input') as HTMLInputElement | null;
      const carNames = carNamesInput?.value?.split(',');

      if (validateCarNames(carNames)) {
        onCarNamesSubmit(carNames);
      }
    });
  }

  private addTurnCountEventListener(onTurnCountSubmit: FormConstructorParams['onTurnCountSubmit']) {
    this.turnCountForm?.addEventListener('submit', function (this, event) {
      event.preventDefault();

      const turnCountInput = this.elements.namedItem('turn-count-input') as HTMLInputElement | null;
      const turnCount = turnCountInput?.valueAsNumber;

      if (validateTurnCount(turnCount)) {
        onTurnCountSubmit(turnCount);
      }
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

    this.setDisabled(false);
  }

  setDisabled(disabled: boolean) {
    const carNamesInput = this.carNamesForm!.elements.namedItem(
      'car-names-input'
    ) as HTMLInputElement;
    const carNamesButton = this.carNamesForm!.elements.namedItem(
      'car-names-button'
    ) as HTMLButtonElement;

    const turnCountInput = this.turnCountForm!.elements.namedItem(
      'turn-count-input'
    ) as HTMLInputElement;
    const turnCountButton = this.turnCountForm!.elements.namedItem(
      'turn-count-button'
    ) as HTMLButtonElement;

    if (disabled) {
      carNamesInput.setAttribute('disabled', '');
      carNamesButton.setAttribute('disabled', '');
      turnCountInput.setAttribute('disabled', '');
      turnCountButton.setAttribute('disabled', '');
    } else {
      carNamesInput.removeAttribute('disabled');
      carNamesButton.removeAttribute('disabled');
      turnCountInput.removeAttribute('disabled');
      turnCountButton.removeAttribute('disabled');
    }
  }
}

export default Form;
