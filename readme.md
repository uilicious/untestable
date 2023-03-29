# Untestable

> **Testability**: A characteristic of an item's design which allows the status (operable, inoperable or degraded) of that item to be confidently and quickly determined. - An Elementary Guide To Reliability (Fifth Edition), 1997

[Untestable.site](https://untestable.site) is a website that exhibits UI components that works perfectly for human beings, but breaks browser automation scripts. Feel free to use it to practice writing tests script. Contributions to add to the gallery of untestable components are very welcomed.

## Contributing to the untestable.site

### Setting up the project locally

Step 1 : Install dependencies
```
npm install
```

Step 2: Start the web application
```
npm run start
```

This will start the web applications at [http://localhost:8080](http://localhost:8080).

### Running tests

This project uses the [Mocha](https://mochajs.org/) as the test framework.

To run a test:
```
npm run test <path/to/the/test/file>
```

Tests are placed in the `/tests` folder.

### Submitting a new untestable component

We will love contributions to gallery of untestable UI components.

Feel free to **fork** this repository, create a demo page for the untestable UI component, alongside working tests with workarounds to test such components, and submit a pull request.
