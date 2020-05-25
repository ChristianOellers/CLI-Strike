const inquirer = require('inquirer');

const {questionsSelection, questionsGameLoop, questionsGameEndWin, questionsGameEndLose} = require('./config');


(() => {
  let score = 0;

  /**
   * Game loop
   */
  async function run () {
    await inquirer.prompt(questionsSelection);

    const answersGameLoop = await inquirer.prompt(questionsGameLoop);

    if (answersGameLoop.attack) {
      await attack();
    }

    console.log(`Score: ${score} /// RESTARTING`);
    run();
  }

  /**
   * Decision path: Attacks
   */
  async function attack () {
    const isSuccess = (Math.random() >= 0.5);
    const nextQuestions = isSuccess ? questionsGameEndWin : questionsGameEndLose;

    score += (isSuccess) ? 1 : 0;

    console.log('.... Aiming ... Hoping ... AAAAAND; ');

    return await inquirer.prompt(nextQuestions);
  }


  run();

})();
