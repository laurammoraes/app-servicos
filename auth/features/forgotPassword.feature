@forgotPassword
Feature: FORGOTPASSWORD

@200forgotPasswordTeste
Scenario: 200 - Post
    When I send a 'POST' request to 'http://localhost:3000/forgotPassword' 
    And I add the request body:
      """
      { "email" : "laurammoraes2@gmail.com"}
      """
 
    Then I should receive a response with the status 200