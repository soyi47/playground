import Award from './Award';
import Car from './Car';
import Form from './Form';

class RacingCarGame {
  private _cars: Car[];
  private _turnCount: number;
  private _winners: Car[];

  private readonly form = new Form({
    onCarNamesSubmit: this.handleCarNamesSubmit.bind(this),
    onTurnCountSubmit: this.handleTurnCountSubmit.bind(this),
  });

  private readonly award = new Award({
    onRestart: this.init.bind(this),
  });

  private readonly playground = document.getElementById('play-ground') as HTMLDivElement;

  constructor() {
    this._cars = [];
    this._turnCount = 0;
    this._winners = [];
  }

  init(): void {
    this._cars = [];
    this._turnCount = 0;
    this._winners = [];

    this.form.init();
    this.award.init();

    this.playground.innerHTML = '';
  }

  isReadyToPlay(): boolean {
    return this._cars.length > 0 && this._turnCount > 0;
  }

  handleCarNamesSubmit(carNames: string[]): void {
    const newCars: Car[] = carNames.map(name => new Car(name));
    this._cars = newCars;

    if (this.isReadyToPlay()) {
      this.play();
    }
  }

  handleTurnCountSubmit(turnCount: number): void {
    this._turnCount = turnCount;

    if (this.isReadyToPlay()) {
      this.play();
    }
  }

  play(): void {
    this.form.setFormDisabled(true);

    for (let i = 0; i < this._turnCount; i += 1) {
      this.takeTurn();
    }

    this.showAward();
  }

  private takeTurn(): void {
    this._cars.forEach(car => {
      car.takeTurn();
    });
  }

  private showAward(): void {
    this.calculateWinner();
    this.award.showWinner(this._winners.map(car => car.name));
  }

  private calculateWinner(): void {
    const sortedByRank = [...this._cars];
    sortedByRank.sort(this.sortByRank);

    const winnerProgress = sortedByRank[0].progress;
    this._winners = sortedByRank.filter(car => {
      return car.progress === winnerProgress;
    });
  }

  private readonly sortByRank = (a: Car, b: Car): number => {
    return b.progress - a.progress;
  };
}

export default RacingCarGame;
