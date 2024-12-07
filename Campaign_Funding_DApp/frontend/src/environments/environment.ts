export const environment = {
  env: 'prod',
  test: process.env['API_SECRET_KEY'] || 'Unable to read process env',
};
