@delete
Feature: DELETEUSER

@200deleteUserTeste
Scenario: 200 - Delete
    When I send a 'DELETE' request to 'http://localhost:3000/user' 
    Then I should receive a response with the status 200