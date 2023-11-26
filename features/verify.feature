@verify
Feature: VERIFY

@200verifyUser
Scenario: 200 - Post 
    When I send a 'POST' request to 'http://localhost:3000/verifyCode'
    And I add the request body:
      """"
      {"email":"laurammoraes2@gmail.com", "codeEmailVerify":""}
      """"
    Then I should receive a response with the status 200


