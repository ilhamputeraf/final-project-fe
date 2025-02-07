import '@testing-library/jest-dom/extend-expect';

// Mock `next/router` if needed
jest.mock('next/router', () => require('next-router-mock'));

// Mock fetch API (if your app makes API calls)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);
