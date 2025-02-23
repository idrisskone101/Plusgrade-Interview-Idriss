import "@testing-library/jest-dom";

// Add global fetch mock
global.fetch = jest.fn() as jest.Mock;
