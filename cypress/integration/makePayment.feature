Feature: Make a payment

  I want to make a payment

  @focus
  Scenario: Make a domestic payment
    Given The app is ready for a domestic payment
    When I open a payment page
    And I fill in details for a domestic payment
    And I submit a payment
    Then The domestic payment is made
    And I see created payment confirmation

