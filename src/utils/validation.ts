const spaceCheckPattern = /\s/g;

export const validateCarNames = (carNames: string[] | undefined): carNames is string[] => {
  try {
    if (!carNames) {
      throw new Error('자동차 이름을 입력해주세요.');
    }

    carNames.forEach(name => {
      if (name.length > 5) {
        throw new Error(`자동차 이름은 5자 이하로 입력해주세요. - ${name}`);
      }

      if (name.match(spaceCheckPattern)) {
        throw new Error(`자동차 이름에는 공백이 들어갈 수 없습니다. - ${name}`);
      }
    });
  } catch (error: any) {
    alert((error as Error).message);
    return false;
  }

  return true;
};

export const validateTurnCount = (turnCount: number | undefined): turnCount is number => {
  try {
    if (!turnCount || turnCount < 0) {
      throw new Error('시도할 횟수를 0 이상 자연수로 입력해주세요.');
    }

    if (!Number.isInteger(turnCount)) {
      throw new Error('시도할 횟수는 자연수로 입력해주세요.');
    }
  } catch (error: any) {
    alert((error as Error).message);
    return false;
  }

  return true;
};
