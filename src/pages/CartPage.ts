import BasePage from './BasePage';

/**
 * Cart page object
 * TODO: Candidate should implement this page object
 */
export default class CartPage extends BasePage {
  // Selectors for cart page elements
  private cartItem = '.cart_item';
  private cartItemName = '.inventory_item_name';
  private removeButton: (itemName: string) => string = (itemName: string): string =>
    `button[id="remove-${itemName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}"]`;
  private checkoutButton = '[data-test="checkout"]';

  /**
   * Checks if the page is loaded
   * @returns True if the page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await $(this.cartItem).isDisplayed();
  }

  /**
   * Gets the list of items in the cart
   * @returns Array of item names in the cart
   */
  async getCartItems(): Promise<string[]> {
    const items = await $$(this.cartItemName);
    const names: string[] = [];
    for (const el of items) {
      names.push(await el.getText());
    }
    return names;
  }

  /**
   * Removes an item from the cart by its name
   * @param itemName Name of the item to remove
   */
  async removeItem(itemName: string): Promise<void> {
    const buttonSelector = this.removeButton(itemName);
    await this.click(buttonSelector);
  }

  /**
   * Proceeds to checkout
   */
  async checkout(): Promise<void> {
    await this.click(this.checkoutButton);
  }
}
