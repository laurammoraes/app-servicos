@singin
Feature: SINGIN

@201singupTeste
Scenario: 201 - Post
    When I send a 'POST' request to 'http://localhost:3000/singin' 
    And I add the request body:
      """
      { "email" : "laura@gmail.com", "password" : "Ritinha-09"}
      """
 
    Then I should receive a response with the status 200
  
