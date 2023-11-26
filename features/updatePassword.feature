@updatePassword
Feature: UPDATEPASSWORD

@200updatePasswordTeste
Scenario: 200 - Post
    When I send a 'POST' request to 'http://localhost:3000/updatePassword' 
    And I add the request body:
      """
      { "email" : "laurammoraes2@gmail.com", "code":"733404", "newPassword":"Laura-123"}
      """
 
    Then I should receive a response with the status 200