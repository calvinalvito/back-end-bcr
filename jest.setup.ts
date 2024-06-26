import { configure } from '@testing-library/dom';
import dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded

configure({
  testIdAttribute: 'data-test',
});

// Other setup code if needed
