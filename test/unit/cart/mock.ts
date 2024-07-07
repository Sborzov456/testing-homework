import { Product } from '@/common/types';
import { CartItem } from '@/common/types';

export const testProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1', material: 'Material 1', color: 'Color 1' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2', material: 'Material 2', color: 'Color 2' },
    { id: 3, name: 'Product 3', price: 300, description: 'Description 3', material: 'Material 3', color: 'Color 3' },
];

export const testCart: Record<number, CartItem> = {
    '1': { name: 'Product 1', price: 100, count: 1 },
    '2': { name: 'Product 2', price: 200, count: 1 },
    '3': { name: 'Product 3', price: 300, count: 1 },
};

export type TableRow = CartItem & {total: number};
export const testTableData: TableRow[]  = [
    { name: 'Product 1', price: 100, count: 1, total: 100 * 1 },
    { name: 'Product 2', price: 200, count: 1, total: 200 * 1 },
    { name: 'Product 3', price: 300, count: 1, total: 300 * 1 },
];
