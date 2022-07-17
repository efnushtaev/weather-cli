import chalk from "chalk";

const getBeautyWeather = (city, weather, t, altT, wind) => {
  const formatTemperature = (t) => (+t > 0 ? `+${t}*` : `${t}*`);

  console.log(` 
    ${chalk.bgMagenta(`  - - ${city} - -  `)}

    ${chalk.bold(`- Сейчас ${weather} -`)}
    
    Температура - ${formatTemperature(t)}

    Ощущается как - ${formatTemperature(altT)} 

    Ветер - ${wind}м/c

    - - - - - - - - - - - -
    `);
};

export { getBeautyWeather };