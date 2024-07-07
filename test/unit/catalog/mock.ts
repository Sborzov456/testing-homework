import { Product, ProductShortInfo } from '@/common/types';

export const testProductsShort: ProductShortInfo[] = [
    {
        id: 0,
        name: 'Awesome kogtetochka',
        price: 867,
    },
    {
        id: 1,
        name: 'Tasty kogtetochka',
        price: 739,
    },
    {
        id: 2,
        name: 'Handmade kogtetochka',
        price: 835,
    },
];

export const testProducts: Product[] = [
    {
        id: 0,
        name: 'Licensed kogtetochka',
        description: 'Really Modern kogtetochka for American Curl',
        price: 696,
        color: 'olive',
        material: 'Metal',
    },
    {
        id: 1,
        name: 'Gorgeous kogtetochka',
        description: 'Really Gorgeous kogtetochka for British Shorthair',
        price: 76,
        color: 'lavender',
        material: 'Bronze',
    },
    {
        id: 2,
        name: 'Modern kogtetochka',
        description: 'Really Fantastic kogtetochka for Tonkinese',
        price: 714,
        color: 'fuchsia',
        material: 'Soft',
    },
];
