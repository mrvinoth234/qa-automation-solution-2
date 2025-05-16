import LoginPage from '../../src/pages/LoginPage';
import InventoryPage from '../../src/pages/InventoryPage';
import CartPage from '../../src/pages/CartPage';
import TestData from '../../src/utils/TestData';

const ITEM_NAME = 'Sauce Labs Backpack';

async function clearCart(cartPage: CartPage, inventoryPage: InventoryPage): Promise<void> {
  await inventoryPage.goToCart();
  if (await cartPage.isLoaded()) {
    const items = await cartPage.getCartItems();
    for (const item of items) {
      await cartPage.removeItem(item);
    }
  }
  await browser.url('https://www.saucedemo.com/inventory.html');
}

describe('Shopping cart functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    inventoryPage = new InventoryPage();
    cartPage = new CartPage();

    // Login before each test
    await loginPage.open();
    await loginPage.login(TestData.STANDARD_USER.username, TestData.STANDARD_USER.password);
    await expect(inventoryPage.isLoaded()).resolves.toBe(true);

    // Ensure cart is empty before each test
    await clearCart(cartPage, inventoryPage);
  });

  it('should add an item to the cart', async () => {
    // Add a specific item to the cart
    await inventoryPage.addItemToCart(ITEM_NAME);

    // Verify that the cart badge shows the correct count
    const cartBadge = await inventoryPage.getCartItemCount();
    expect(cartBadge).toBe('1');
  });

  it('should display the correct item in the cart', async () => {
    // Add a specific item to the cart
    await inventoryPage.addItemToCart(ITEM_NAME);

    // Navigate to the cart page
    await inventoryPage.goToCart();

    // Verify that the cart contains the correct item
    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toEqual([ITEM_NAME]);
  });

  it('should remove an item from the cart', async () => {
    // Add item to the cart
    await inventoryPage.addItemToCart(ITEM_NAME);

    // Navigate to the cart page
    await inventoryPage.goToCart();

    // Remove the item
    await cartPage.removeItem(ITEM_NAME);

    // Verify that the item is no longer in the cart
    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toEqual([]);
  });
});
