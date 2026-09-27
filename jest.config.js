module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|webp|ico)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
};