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
import { screen } from '@testing-library/react';
import { Contacts } from '@/client/pages/Contacts';
import { Delivery } from '@/client/pages/Delivery';
import '@testing-library/jest-dom';

describe('Проверка наличия страниц и роутинга между ними', () => {
    beforeEach(() => {
        const api = new ExampleApi('/hw/store');
        const cart = new CartApi();
        const store = initStore(api, cart);
        render(renderWithRouterProvider(renderWithStoreProviders(<Application />, store)));
    });
    test('Наличие главной страницы', () => {
        fireEvent.click(
            screen.getByRole('link', {
                name: /Kogtetochka store/i,
            })
        );
        expect(screen.getByText('Welcome to Kogtetochka store!')).toBeInTheDocument();
    });
    test('Наличие страницы каталога', () => {
        fireEvent.click(
            screen.getByRole('link', {
                name: /catalog/i,
            })
        );
        expect(screen.getByRole('heading', { name: /catalog/i })).toBeInTheDocument();
    });
    test('Наличие страницы доствки', () => {
        fireEvent.click(
            screen.getByRole('link', {
                name: /delivery/i,
            })
        );
        expect(screen.getByRole('heading', { name: /delivery/i })).toBeInTheDocument();
    });
    test('Наличие страницы контактов', () => {
        fireEvent.click(
            screen.getByRole('link', {
                name: /contacts/i,
            })
        );
        expect(screen.getByRole('heading', { name: /contacts/i })).toBeInTheDocument();
    });
});
describe('Проверка статичности содержимого страниц', () => {
    // Инициализация стора
    const api = new ExampleApi('/hw/store');
    const cart = new CartApi();
    const store = initStore(api, cart);
    test('Содержимое домашней страницы статично', () => {
        const app = render(renderWithRouterProvider(renderWithStoreProviders(<Application />, store)));
        expect(app).toMatchSnapshot();
    });
    test('Содержание страницы "Условия доставки" статично', () => {
        const deliveryPage = render(renderWithRouterProvider(renderWithStoreProviders(<Delivery />, store)));
        expect(deliveryPage).toMatchSnapshot();
    });
    test('Содержимое страницы "Контакты" статично', () => {
        const contactsPage = render(renderWithRouterProvider(renderWithStoreProviders(<Contacts />, store)));
        expect(contactsPage).toMatchSnapshot();
    });
});
