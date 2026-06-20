  // EXERCISE 1: Verify Login Page
  it('Exercise 1: Verify Login Page', () => {
    cy.visit('https://www.saucedemo.com/');
    
    // Verify login form is visible
    cy.url().should('include', 'saucedemo.com');
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');
    cy.get('.login_logo').should('contain', 'Swag Labs');
  });

  // EXERCISE 2: Successful Login
  it('Exercise 2: Successful Login', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Verify redirect to inventory
    cy.url().should('include', '/inventory.html');
    cy.get('.shopping_cart_link').should('be.visible');
  });

  // EXERCISE 3: Invalid Login
  it('Exercise 3: Invalid Login', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('invalid_password');
    cy.get('[data-test="login-button"]').click();
    
    // Verify error message
    cy.get('[data-test="error"]').should('be.visible');
  });

  // EXERCISE 4: Logout
  it('Exercise 4: Logout', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Open side menu then logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    // Verify user is back on the login page
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('[data-test="login-button"]').should('be.visible');
  });

  // EXERCISE 5: Verify Inventory Items
  it('Exercise 5: Verify Inventory Items', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Verify product cards look correct
    cy.get('.inventory_item').should('have.length.at.least', 1);
    cy.get('.inventory_item_name').first().should('be.visible');
    cy.get('.inventory_item_price').first().should('be.visible');
  });

  // EXERCISE 6: Sort Products
  it('Exercise 6: Sort Products', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Sort by price low to high and verify
    cy.get('.product_sort_container').select('lohi');
    cy.get('.inventory_item_price').first().should('contain', '$7.99');
  });

  // EXERCISE 7: View Product Details
  it('Exercise 7: View Product Details', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Click product to see info page
    cy.get('.inventory_item_name').first().click();
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('be.visible');
  });

  // EXERCISE 8: Add Product to Cart
  it('Exercise 8: Add Product to Cart', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Add first item to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Verify badge updates and open cart
    cy.get('.shopping_cart_badge').should('contain', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
  });

  // EXERCISE 9: Remove Product from Cart
  it('Exercise 9: Remove Product from Cart', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Add item and go to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    
    // Remove item and check cart badge disappears
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  // EXERCISE 10: Complete Checkout
  it('Exercise 10: Complete Checkout', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Add to cart and proceed to checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Complete form details
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    // Verify purchase completion message
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });

  // EXERCISE 11: Verify Cancel Checkout
  it('Exercise 11: Verify Cancel Checkout', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Click checkout then cancel
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="cancel"]').click();

    // Verify redirected back to cart page
    cy.url().should('include', '/cart.html');
  });

  // EXERCISE 12: Verify Shopping Cart Badge
  it('Exercise 12: Verify Shopping Cart Badge', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Add two items and verify badge count matches
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('contain', '2');
  });
