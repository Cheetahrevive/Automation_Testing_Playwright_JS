// utils/pageObjects/LoginPage.js
// Example Page Object Model for reusable UI element definitions

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    // Define selectors
    get emailInput() {
        return this.page.getByPlaceholder('Enter email');
    }

    get passwordInput() {
        return this.page.getByPlaceholder('Enter password');
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get errorMessage() {
        return this.page.getByRole('alert');
    }

    // Define actions
    async navigateTo() {
        await this.page.goto('/login');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async isErrorMessageVisible() {
        return await this.errorMessage.isVisible();
    }
}

module.exports = LoginPage;
