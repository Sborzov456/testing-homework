describe('Проверка адаптивного отображения домашней страницы', () => {

    it('450 x 900', async ({ browser }) => {
        await browser.setWindowSize(450, 900);
        await browser.url('http://localhost:3000/hw/store');

        const home = await browser.$('.Home');
        expect(await home.isDisplayed()).toBe(true);

        await home.assertView('plain', {ignoreDiffPixelCount : '5%'})
    });

    it('700 x 1000', async ({ browser }) => {
        await browser.setWindowSize(700, 1000);
        await browser.url('http://localhost:3000/hw/store');

        const home = await browser.$('.Home');
        expect(await home.isDisplayed()).toBe(true);

        await home.assertView('plain', {ignoreDiffPixelCount : '5%'})

    });

    it('1200 x 900', async ({ browser }) => {
        await browser.setWindowSize(1200, 900); // Desktop size
        await browser.url('http://localhost:3000/hw/store');

        const home = await browser.$('.Home');
        expect(await home.isDisplayed()).toBe(true);

        await home.assertView('plain', {ignoreDiffPixelCount : '5%'})
    });

});


describe('Проверка адаптивности страницы каталога', () => {
    it('450 x 900', async ({ browser }) => {
        await browser.setWindowSize(450, 900);
        await browser.url('http://localhost:3000/hw/store/catalog');

        const catalog = await browser.$('.Catalog');
        expect(await catalog.isDisplayed()).toBe(true);

        await catalog.assertView('plain')
    });

    it('700 x 1000', async ({ browser }) => {
        await browser.setWindowSize(700, 1000);
        await browser.url('http://localhost:3000/hw/store/catalog');

        const catalog = await browser.$('.Catalog');
        expect(await catalog.isDisplayed()).toBe(true);

        await catalog.assertView('plain')
    });

    it('1200 x 900', async ({ browser }) => {
        await browser.setWindowSize(1200, 900); // Desktop size
        await browser.url('http://localhost:3000/hw/store/catalog');

        const catalog = await browser.$('.Catalog');
        expect(await catalog.isDisplayed()).toBe(true);

        await catalog.assertView('plain')
    });

});



describe('Проверка адаптивности страницы доставки', () => {
    it('450 x 900', async ({ browser }) => {
        await browser.setWindowSize(450, 900);
        await browser.url('http://localhost:3000/hw/store/delivery');

        const delivery = await browser.$('.Delivery');
        expect(await delivery.isDisplayed()).toBe(true);

        await delivery.assertView('plain')
    });

    it('700 x 1000', async ({ browser }) => {
        await browser.setWindowSize(700, 1000);
        await browser.url('http://localhost:3000/hw/store/delivery');

        const delivery = await browser.$('.Delivery');
        expect(await delivery.isDisplayed()).toBe(true);

        await delivery.assertView('plain')
    });

    it('1200 x 900', async ({ browser }) => {
        await browser.setWindowSize(1200, 900); // Desktop size
        await browser.url('http://localhost:3000/hw/store/delivery');

        const delivery = await browser.$('.Delivery');
        expect(await delivery.isDisplayed()).toBe(true);

        await delivery.assertView('plain')
    });

});


describe('Проверка адаптивности страницы контактов', () => {
    it('450 x 900', async ({ browser }) => {
        await browser.setWindowSize(450, 900);
        await browser.url('http://localhost:3000/hw/store/contacts');

        const contacts = await browser.$('.Contacts');
        expect(await contacts.isDisplayed()).toBe(true);

        await contacts.assertView('plain')
    });

    it('700 x 1000', async ({ browser }) => {
        await browser.setWindowSize(700, 1000);
        await browser.url('http://localhost:3000/hw/store/contacts');

        const contacts = await browser.$('.Contacts');
        expect(await contacts.isDisplayed()).toBe(true);

        await contacts.assertView('plain')
    });

    it('1200 x 900', async ({ browser }) => {
        await browser.setWindowSize(1200, 900); 
        await browser.url('http://localhost:3000/hw/store/contacts');

        const contacts = await browser.$('.Contacts');
        expect(await contacts.isDisplayed()).toBe(true);

        await contacts.assertView('plain')
    });
});

describe('Проверка адаптивности навигационного меню', function() {
    it('Меню скрывается за гамбургер на ширине меньше 576', async ({ browser }) => {
        await browser.setWindowSize(450, 900);
        await browser.url('http://localhost:3000/hw/store');

        const navMenu = await browser.$('.navbar-nav');
        expect(await navMenu.isDisplayed()).toBe(false);

        const hamburger = await browser.$('.navbar-toggler-icon');
        expect(await hamburger.isDisplayed()).toBe(true);

        await hamburger.click();
        expect(await navMenu.isDisplayed()).toBe(true);

        const menuItem = await browser.$('.nav-link');
        await menuItem.click();

        expect(await navMenu.isDisplayed()).toBe(false);
    });


    it('При выборе элемента из меню гамбургера, оно закрывается', async ({browser}) => {
        await browser.setWindowSize(450, 900);
        await browser.url('http://localhost:3000/hw/store');

        const hamburger = await browser.$('.navbar-toggler-icon');
        await hamburger.click();

        const navMenu = await browser.$('.navbar-nav');

        const menuItem = await browser.$(".nav-link");
        await menuItem.click();

        expect(await navMenu.isDisplayed()).toBe(false);
    });
})
