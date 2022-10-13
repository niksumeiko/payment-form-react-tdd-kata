Feature: Make a payment

  I want to make a payment

  Scenario: Make a domestic payment
    Given I open a payment page
    When I fill in details for a domestic payment
    And I submit a payment
    Then I see successful payment confirmation

  Scenario: Make an international payment
    Given I open a payment page
    When I fill in details for an international payment
    And I submit a payment
    Then I see successful payment confirmation

  Scenario: Close successful payment confirmation
    Given I open a payment page
    And I fill in details for a domestic payment
    And I submit a payment
    When I close successful payment confirmation
    Then I see a page ready for a next payment
