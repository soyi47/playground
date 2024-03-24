const serverURL = 'http://localhost:8080';

const defaultCaseValues = {
  carNames: 'east,west,north,south',
  turnCount: '6',
};

describe('주요 기능 테스트', () => {
  beforeEach(() => {
    cy.visit(serverURL);
  });

  it('자동차 이름을 입력하고, 확인 버튼을 누를 수 있다.', () => {
    cy.get('#car-names-input').type(defaultCaseValues.carNames);
    cy.get('#car-names-button').click();
  });

  it('시도할 횟수를 입력하고, 확인 버튼을 누를 수 있다.', () => {
    cy.get('#turn-count-input').type(defaultCaseValues.turnCount);
    cy.get('#turn-count-button').click();
  });

  it('자동차 이름과 시도할 횟수를 정상적으로 제출하면, 경기에 참여하는 자동차 이름과 진행상황이 나타난다.', () => {
    cy.get('#car-names-input').type(defaultCaseValues.carNames);
    cy.get('#car-names-button').click();
    cy.get('#turn-count-input').type(defaultCaseValues.turnCount);
    cy.get('#turn-count-button').click();

    defaultCaseValues.carNames.split(',').forEach(name => {
      cy.get('.car-name').contains(name).should('be.visible');
      cy.get('.car-name').contains(name).siblings('.car-process').should('be.visible');
    });
  });

  it('자동차 이름과 시도할 횟수를 정상적으로 제출하면, 우승자가 나타난다.', () => {
    cy.get('#car-names-input').type(defaultCaseValues.carNames);
    cy.get('#car-names-button').click();
    cy.get('#turn-count-input').type(defaultCaseValues.turnCount);
    cy.get('#turn-count-button').click();

    cy.contains('우승자').should('be.visible');
  });

  it('자동차 이름과 시도할 횟수를 정상적으로 제출하면, "다시 시작하기" 버튼이 나타난다.', () => {
    cy.get('#car-names-input').type(defaultCaseValues.carNames);
    cy.get('#car-names-button').click();
    cy.get('#turn-count-input').type(defaultCaseValues.turnCount);
    cy.get('#turn-count-button').click();

    cy.contains('다시 시작하기').should('be.visible');
  });
});

describe('자동차 유효성 검사 기능 테스트', () => {
  beforeEach(() => {
    cy.visit(serverURL);
  });

  it('입력값 없이 제출하면, alert로 에러 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#car-names-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });

  it('5자 초과인 이름과 함께 제출하면, alert로 에러 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#car-names-input').type('test,5자초과테스트');
    cy.get('#car-names-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });

  it('공백이 포함된 이름과 함께 제출하면, alert로 에러 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#car-names-input').type('test,공백 확인');
    cy.get('#car-names-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });
});

describe('시도할 횟수 유효성 검사 기능 테스트', () => {
  beforeEach(() => {
    cy.visit(serverURL);
  });

  it('입력값 없이 제출하면, alert로 에러 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#turn-count-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });

  it('시도할 횟수가 0 이하일 때 제출하면, alert로 에러 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#turn-count-input').type('-1');
    cy.get('#turn-count-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });

  it('시도할 횟수가 정수가 아닐 때 제출하면, alert로 에러 메시지를 출력한다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#turn-count-input').type('1.23');
    cy.get('#turn-count-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });
});
