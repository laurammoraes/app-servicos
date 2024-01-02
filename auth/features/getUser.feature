@listUser
Feature: LISTUSER

@200listUserTeste
Scenario: 200 - Get
    When I send a 'GET' request to 'http://localhost:3000/user' 
    Then I should receive a response with the status 200