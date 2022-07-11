const getArgs = (argv) => {
  const res = {};
  const [executer, file, ...rest] = argv;

  rest.forEach((value, index, arr) => {
    if (value.charAt(0) == "-") {
      if (index == arr.length - 1) {
        res[value.substring(1)] = true;
      } else if (arr[index + 1].charAt(0) != "-") {
        res[value.substring(1)] = arr[index + 1];
      } else {
        res[value.substring(1)] = true;
      }
    }
  });

  return res;
};

export { getArgs };
