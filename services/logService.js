import chalk from "chalk";
import dedent from 'dedent-js'

const printError = (err) => {
  console.log(`${chalk.bgRed(" ERROR ")} ${err}`);
};

const printSuccess = (msg) => {
  console.log(`${chalk.bgGreenBright(" SUCCESS ")} ${msg}`);
};

const printHelp = () => {
  console.log(
	dedent`${chalk.bgCyan(' HELP ')}
	Без параметров - вывод погоды
	-c [CITY] для установки города
	-t [API_KEY] для сохранения токена
	-h для вывода помощи
	`
  );
};



export { printHelp, printError, printSuccess };
