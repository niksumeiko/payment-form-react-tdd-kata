Feature: Form Page

  I want to open a form

  @focus
  Scenario: Opening a form page
    Given I open a form page
    Then I see "React App" in the title
