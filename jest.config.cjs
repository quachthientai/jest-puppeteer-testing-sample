module.exports = {
   verbose: true,
   rootDir: ".",
   testTimeout: 30000,
   maxWorkers: 3,
   transform : {
      "^.+\\.[t|j]sx?$": "babel-jest"
   }
};