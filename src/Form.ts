class Form {
  private carNamesForm: HTMLFormElement | null;
  private turnCountForm: HTMLFormElement | null;

  constructor() {
    this.carNamesForm = document.getElementById('car-names-form') as HTMLFormElement | null;
    this.carNamesForm?.addEventListener('submit', function (this, event) {
      event.preventDefault();

      const carNamesInput = this.elements.namedItem('car-names-input') as HTMLInputElement | null;
      const carNames = carNamesInput?.value.split(',');
      console.log(carNames);
    });

    this.turnCountForm = document.getElementById('turn-count-form') as HTMLFormElement | null;
    this.turnCountForm?.addEventListener('submit', function (this, event) {
      event.preventDefault();

      const turnCountInput = this.elements.namedItem('turn-count-input') as HTMLInputElement | null;
      const turnCount = turnCountInput?.valueAsNumber;
      console.log(turnCount);
    });
  }
}

export default Form;
