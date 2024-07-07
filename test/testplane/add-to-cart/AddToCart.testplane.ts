describe('Добавление товара в корзину', () => {
    it('При клике на товар в каталоге, он добавляется в корзину', async ({browser}) => {
        await browser.url('http://localhost:3000/hw/store/catalog');
        const detailsLink = await browser.$('.ProductItem-DetailsLink');
        await detailsLink.click();
        const addToCartButton = await browser.$('.ProductDetails-AddToCart');
        await addToCartButton.click();
        const linkToCart = await browser.$('.nav-link[href="/hw/store/cart"]');
        await linkToCart.click();
        await browser.url('http://localhost:3000/hw/store/cart')
        const rows = await browser.$$('tr');
        expect(rows).toHaveLength(1 + 2);
    })
})