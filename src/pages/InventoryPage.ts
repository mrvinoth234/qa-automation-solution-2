import BasePage from './BasePage';

/**
 * Inventory page object
 * TODO: Candidate should implement this page object
 */
export default class InventoryPage extends BasePage {
  // Selectors for inventory page elements
  private inventoryItem = '.inventory_item';
  private addToCartButton: (itemName: string) => string = (itemName: string): string =>
    `button[id="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}"]`;
  private cartIcon = '.shopping_cart_link';
  private cartBadge = '.shopping_cart_badge';

  /**
   * Checks if the page is loaded
   * @returns True if the page is loaded
   */
  async isLoaded(): Promise<boolean> {
    return await $(this.inventoryItem).isDisplayed();
  }

  /**
   * Adds an item to the cart by its name
   * @param itemName Name of the item to add
   */
  async addItemToCart(itemName: string): Promise<void> {
    const buttonSelector = this.addToCartButton(itemName);
    const addButton = await $(buttonSelector);
    if (await addButton.isExisting() && await addButton.isDisplayed()) {
      await this.click(buttonSelector);
      // Wait for the cart badge to update after adding
      await browser.waitUntil(async () => {
        const badge = await $(this.cartBadge);
        return (await badge.isExisting()) && (await badge.getText()) !== '';
      }, { timeout: 5000, timeoutMsg: 'Cart badge did not appear after adding item' });
    }
    // If button does not exist, item is already in cart; do nothing
  }

  /**
   * Gets the number of items in the cart
   * @returns Number of items in the cart
   */
  async getCartItemCount(): Promise<string> {
    // Wait for the cart badge to exist or return '0' if not present
    try {
      await $(this.cartBadge).waitForExist({ timeout: 3000 });
      return await this.getText(this.cartBadge);
    } catch {
      return '0';
    }
  }

  /**
   * Navigates to the cart page
   */
  async goToCart(): Promise<void> {
    await this.click(this.cartIcon);
  }
}
