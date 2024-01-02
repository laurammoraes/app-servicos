@updateUser
Feature: UPDATEUSER

@200updateUserTeste
Scenario: 200 - Put
    When I send a 'PUT' request to 'http://localhost:3000/user' 
    And I add the request body:
      """
      {  "newPhoneNumber":"+5519993419999"}
      """
 
    Then I should receive a response with the status 200