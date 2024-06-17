# Testing Strategy

## Overview

"Toni" is a navigation app designed for blind people,
assisting them in navigating their surroundings using step-by-step instructions.
It incorporates a unique feature allowing users to calibrate their steps for accurate distance measurement.
It is a pure frontend application without its own backend.

-- IMAGE --

## Testing Objectives

- Ensure the app provides reliable and accurate navigation instructions.
- Verify that step calibration accurately translates distance into steps.
- Assess the app's accessibility and usability for blind users.
- Validate the integration with external APIs (Photon for Geocoding, Valhalla for Routing).

Accessibility and the smooth calibration of steps are the most important quality attributes of our app. Navigation is of course also important, but as the routing takes place via an external API (Valhalla), we only have limited influence on it.

## Testing Types

- Unit Testing: Testing all pure functions in the functions folder using Jest.
- Integration Testing: Testing integration with external APIs for geocoding (Photon) and routing (Valhalla) using Jest.
  <!--- Functional Testing: Ensure navigation features work correctly, including step-by-step directions and recalibration.-->
- Usability Testing: Gather feedback from blind users to improve user experience.

### Accessibility Testing

Assess the app's usability for blind users:

- On iOS, we use the Accessibility Inspector. It ships with macOS and can be accessed easily via Xcode or the macOS Spotlight.
- On Android, we use Accessibility Scanner.
- Using the ESLint "a11y" plugin.
- https://medium.com/reactbrasil/introducing-react-native-accessibility-engine-fcf78f2a3805

### Calibration Testing

- User Testing
  - Calibrating steps for different user profiles.
  - Verifying accuracy by comparing calculated steps with actual distance covered.

## CI/CD

Set up a CI pipeline to run tests automatically when merged/pushed to main branch. This helps catch issues early and ensures that broken code is not merged into the main branch.

<!--
Testing Tools:
Utilize screen readers like VoiceOver (iOS) and TalkBack (Android) for accessibility testing.
Automated testing tools like Jest and Detox for functional and integration testing.
Geographic testing tools for validating location-based features.
Test Environment:
Set up a test environment that includes real-world scenarios encountered by blind users.
Emulators/simulators may not fully replicate real-world conditions; consider real device testing.
Ensure compatibility with various screen reader configurations and assistive technologies.
Test Scenarios:
Test navigation instructions in various environments (e.g., urban, rural, indoor).
Verify step calibration accuracy across different terrains and walking speeds.
Test recalibration functionality to ensure it updates accurately.
Validate the app's ability to provide alternative routes based on user preferences or obstacles.
Test Data:
Prepare test data sets with diverse geographic locations to test the app's routing capabilities.
Include scenarios with different step lengths for step calibration testing.
Test Execution:
Perform manual testing with blind users to gather qualitative feedback on usability and accessibility.
Automate functional and integration tests to ensure consistency and reliability.
Prioritize testing on critical features such as navigation accuracy and step calibration.
Reporting:
Document test results, including any issues encountered and their severity.
Include feedback from blind users to inform usability improvements.
Provide actionable insights to developers for bug fixes and enhancements.
CI/CD Integration:
Integrate testing into the CI/CD pipeline to automate the testing process.
Ensure continuous monitoring of accessibility standards and performance metrics.
Maintenance:
Regularly update the test strategy to incorporate feedback and address emerging issues.
Stay informed about changes in accessibility guidelines and best practices.
Risk Management:
Identify risks such as inaccurate navigation instructions or step calibration errors.
Mitigate risks through thorough testing and user feedback loops.






1. **Unit Testing**
    - Write unit tests for all pure functions in the functions folder. Use Jest as the testing framework and mock dependencies using Jest's mocking capabilities. Test both the happy path and edge cases.
2. **Integration Testing**
    - Test how different parts of the application work together. This could involve testing how components interact with each other, or how functions interact with external services.
3. **End-to-End Testing**
    - Use a tool like Cypress to write end-to-end tests. These tests should cover key user flows through the application. Is that possible in react-native?
4. **Snapshot Testing**
    - Use Jest's snapshot testing feature to catch unexpected changes in the UI.
5. **Manual Testing**
    - Perform manual testing to catch issues that automated tests might miss. This could involve exploratory testing, regression testing, or usability testing.
6. **Performance Testing**
    - Use tools like Lighthouse to test the performance of the application. This could involve testing the load time, the time to interactive, and the overall performance score.
7. **Accessibility Testing**
    - Axe: Ensure that the application is usable by people with a wide range of abilities.
8. **Cross-Platform Testing**
    - Test the application on the different platforms to ensure compatibility. This is especially important for a React Native application, which should be tested on both iOS and Android.
9. **Continuous Integration**
    - Set up a CI pipeline to run tests automatically when merged/pushed to main branch. This helps catch issues early and ensures that broken code is not merged into the main branch.
10. **Code Reviews**
    - In addition to automated testing, perform code reviews on every pull request. This helps catch issues that automated tests might miss, and also helps maintain code quality.
-->
