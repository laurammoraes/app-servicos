@singup
Feature: SIGNUP

@201singupTeste
Scenario: 201 - Post
    When I send a 'POST' request to 'http://localhost:3000/register' 
    And I add the request body:
      """
      { "email" : "laurammoraes2@gmail.com", "password" : "Ritinha-09", "phone_number":"+5519993417478" }
      """
 
    Then I should receive a response with the status 200


  
