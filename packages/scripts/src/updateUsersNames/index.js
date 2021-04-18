const run = async (parameters) => {
  console.log(parameters);
  return 1;
};

export const parameters = [
  {
    name: 'a',
    type: 'string',
    defaultValues: null,
  }
];

export default run;
