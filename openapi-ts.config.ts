// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@hey-api/openapi-ts';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  experimentalParser: true,
  client: '@hey-api/client-fetch',
  input: 'http://10.0.2.2:3000/api/docs-json',
  output: {
    path: 'src/services/api-backend',
    format: 'prettier',
    lint: 'eslint',
  },
  plugins: ['@tanstack/react-query'],
});
