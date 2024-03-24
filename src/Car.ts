import Track from './Track';

const PROCESS_CONDITION = 4;

const getRandomDigit = (): number => {
  return Math.floor(Math.random() * 10);
};

class Car {
  private readonly _name: string;
  private _progress: number;
  private _track: Track | undefined;

  constructor(name: string) {
    this._name = name;
    this._progress = 0;
  }

  get name(): string {
    return this._name;
  }

  get progress(): number {
    return this._progress;
  }

  ready(): void {
    this._track = new Track(this.name);
  }

  takeTurn(): void {
    const randomDigit = getRandomDigit();

    if (randomDigit >= PROCESS_CONDITION) {
      this._progress += 1;
      this._track?.processForward();
    }
  }
}

export default Car;
