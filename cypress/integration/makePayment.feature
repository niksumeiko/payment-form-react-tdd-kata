Feature: Make a payment

  I want to make a payment

  @focus
  Scenario: Make a domestic payment
    Given API "POST" "/pay" endpoint is mocked with
      | id     | x     |
      | iban   | SK123 |
      | amount | 10 |
    Given I open a "/" page
    When I fill in payment details
      | selector | value | inputType |
      | iban     | SK123 |           |
      | amount   | 10    |           |
    And I submit a payment
    Then API "POST" "/pay" endpoint hits with
      | iban   | SK123 |
      | amount | 10 |
    And I see created payment confirmation

