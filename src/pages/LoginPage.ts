import BasePage from './BasePage';

/**
 * Login page object
 * TODO: Candidate should implement this page object
 */
export default class LoginPage extends BasePage {
  // Selectors for login page elements
  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';
  private errorMessage = '[data-test="error"]';

  /**
   * Opens the login page
   */
  async open(): Promise<void> {
    await super.open('/');
  }

  /**
   * Login with the given credentials
   * @param username Username
   * @param password Password
   */
  async login(username: string, password: string): Promise<void> {
    await this.setValue(this.usernameInput, username);
    await this.setValue(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Gets the error message text
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string> {
    try {
      await $(this.errorMessage).waitForDisplayed({ timeout: 3000 });
      return await this.getText(this.errorMessage);
    } catch {
      return '';
    }
  }
}
