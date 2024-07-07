import React from 'react';
import { Application } from '@/client/Application';
import { act, fireEvent, render } from '@testing-library/react';
import { renderWithRouterProvider } from '../../utils/providers/renderWithRouterProvider';
import { renderWithStoreProviders } from '../../utils/providers/renderWithStoreProvider';
import { addToCart } from '@/client/store';
import { Cart } from '@/client/pages/Cart';
import { ExampleApi } from '@/client/api';
import { CartApi } from '@/client/api';
import { initStore } from '@/client/store';
import { TableRow, testCart, testProducts, testTableData } from './mock';
import '@testing-library/jest-dom';

describe('Добавление товара в корзину', () => {
    // Инициализация стора
    const api = new ExampleApi('/hw/store');
    const cart = new CartApi();
    const store = initStore(api, cart);

    beforeAll(() => {
        // Добавление в стор элемента
        act(() => {
            testProducts.forEach(product => {
                store.dispatch(addToCart(product));
            });
        });
    });
    test('Обновление информации в redux-хранилище', () => {
        expect(store.getState().cart).toEqual(testCart);
    })
    test('Обновление информации в меню навигации', () => {
        const app = render(renderWithRouterProvider(renderWithStoreProviders(<Application />, store)));
        const topBarCartInfo = app.getByText(text => text.includes('Cart'));
        const productCountFromTopBar = Number(topBarCartInfo.textContent.split(' ').at(-1).slice(1, 2));
        expect(productCountFromTopBar).toBe(3);
    });
    test('Обновление информации в таблице', () => {
        const cartPage = render(renderWithRouterProvider(renderWithStoreProviders(<Cart />, store)));
        const tableData: TableRow[] = [];
        cartPage
            .getByRole('table')
            .querySelector('tbody')
            .querySelectorAll('tr')
            .forEach(row => {
                const name = row.querySelector('.Cart-Name').innerHTML;
                const price = Number(row.querySelector('.Cart-Price').innerHTML.slice(1));
                const count = Number(row.querySelector('.Cart-Count').innerHTML);
                const total = Number(row.querySelector('.Cart-Total').innerHTML.slice(1));
                tableData.push({ name, price, count, total });
            });
        expect(tableData).toEqual(testTableData);
    });
});

describe('Очистка корзины', () => {
    // Инициализация стора
    const api = new ExampleApi('/hw/store');
    const cart = new CartApi();
    const store = initStore(api, cart);

    beforeAll(() => {
        // Добавление в стор элемента
        act(() => {
            testProducts.forEach(product => {
                store.dispatch(addToCart(product));
            });
        });
        expect(store.getState().cart).toEqual(testCart);

        // Удаление элементов по кнопке очисти
        const cartPage = render(renderWithRouterProvider(renderWithStoreProviders(<Cart />, store)));
        const clearButton = cartPage.getByRole('button', { name: /clear shopping cart/i });
        fireEvent.click(clearButton);
    });
    test('Обновление информации в redux-хранилище', () => {
        expect(store.getState().cart).toEqual({});
    });
    test('Обновление информации в меню навигации', () => {
        const app = render(renderWithRouterProvider(renderWithStoreProviders(<Application />, store)));
        const topBarCartInfo = app.getByText(text => text.includes('Cart')).innerHTML;
        expect(topBarCartInfo).toBe('Cart');
    });
    test('Таблица заменяется ссылкой на каталог', () => {
        const cartPage = render(renderWithRouterProvider(renderWithStoreProviders(<Cart />, store)));
        const tableHTML = cartPage.queryByRole('table');
        expect(tableHTML).toEqual(null);
        cartPage.getByText(/cart is empty\. please select products in the \./i);
    });
})