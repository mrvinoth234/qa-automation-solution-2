/**
 * Base page object that all page objects should extend
 */
export default class BasePage {
  /**
   * Opens a page with the given path
   * @param path Path to navigate to (appended to base URL)
   */
  async open(path: string = ''): Promise<void> {
    await browser.url(path);
  }
  /**
   * Waits for an element to be displayed
   * @param selector Element selector
   * @param timeout Timeout in ms
   */
  async waitForDisplayed(selector: string, timeout: number = 10000): Promise<void> {
    await $(selector).waitForDisplayed({ timeout });
  }

  /**
   * Clicks on an element
   * @param selector Element selector
   */
  async click(selector: string): Promise<void> {
    await this.waitForDisplayed(selector);
    await $(selector).click();
  }

  /**
   * Sets value to an input field
   * @param selector Element selector
   * @param value Value to set
   */
  async setValue(selector: string, value: string): Promise<void> {
    await this.waitForDisplayed(selector);
    await $(selector).setValue(value);
  }

  /**
   * Gets text from an element
   * @param selector Element selector
   * @returns Element text
   */
  async getText(selector: string): Promise<string> {
    await this.waitForDisplayed(selector);
    return await $(selector).getText();
  }
}
