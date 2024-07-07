import axios from 'axios';
import { testProducts, testProductsShort } from './mock';
import { ExampleApi, CartApi } from '@/client/api';
import { initStore } from '@/client/store';
import { fireEvent, render } from '@testing-library/react';
import { renderWithRouterProvider } from '../../utils/providers/renderWithRouterProvider';
import { renderWithStoreProviders } from '../../utils/providers/renderWithStoreProvider';
import { Catalog } from '@/client/pages/Catalog';
import { screen } from '@testing-library/react';
import React, { act } from 'react';
import { Product } from '@/client/pages/Product';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '@/client/Application';
import { addToCart } from '@/client/store';
import { Cart } from '@/client/pages/Cart';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('Подгрузка данных о товаре', () => {
    const api = new ExampleApi('/hw/store');
    const cart = new CartApi();
    const store = initStore(api, cart);
    beforeEach(() => {
        (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: testProductsShort }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Отображение данных о товаре в списке', async () => {
        await act(() => render(renderWithRouterProvider(renderWithStoreProviders(<Catalog />, store))));
        testProductsShort.forEach(el => {
            const cardBody = screen.getAllByTestId('' + el.id)[1].querySelector('.card-body');
            const name = cardBody.querySelector('h5').innerHTML;
            const price = Number(cardBody.querySelector('p').innerHTML.slice(1));
            const link = cardBody.querySelector('a');
            expect(name).toBe(el.name);
            expect(price).toBe(el.price);
        });
    });
    test('Отображение детальной информации о товаре', async () => {
        (axios.get as jest.Mock).mockImplementation(url =>
            Promise.resolve({ data: testProducts.find(el => '' + el.id === url.split('/').at(-1)) })
        );
        await act(() =>
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/catalog/0']}>
                        <Routes>
                            <Route path='/catalog/:id' element={<Product />} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            )
        );
        expect(screen.getByText(`$${testProducts[0].price}`)).toBeInTheDocument();
        expect(screen.getByText(testProducts[0].description)).toBeInTheDocument();
        expect(screen.getByText(testProducts[0].name)).toBeInTheDocument();
        expect(screen.getByText(testProducts[0].color)).toBeInTheDocument();
        expect(screen.getByText(testProducts[0].material)).toBeInTheDocument();
        expect(
            screen.getByRole('button', {
                name: /add to cart/i,
            })
        ).toBeInTheDocument();
    });
});
