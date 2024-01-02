const {
    setWorldConstructor,
    After, AfterAll, Before, BeforeAll,
    Given, When, Then
} = require('cucumber');
const { registerHooks, World, registerSteps } = require('@harver/bat');

setWorldConstructor(World);

// Allow Bat to hook into your Cucumber dependencty:
registerHooks({ Before, BeforeAll, After, AfterAll });
registerSteps({ Given, Then, When });