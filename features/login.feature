@singin
Feature: SINGIN

@200singinTeste
Scenario: 200 - Post
    When I send a 'POST' request to 'http://localhost:3000/login' 
    And I add the request body:
      """
      { "email" : "laurammoraes2@gmail.com", "password" : "Ritinha-09"}
      """
 
    Then I should receive a response with the status 200




