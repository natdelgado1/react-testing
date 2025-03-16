import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calculator } from './Calculator';

describe('<Calculator/>', () => {
    //Aprendiendo Table Driven Testing

    //Configuracion de los casos de prueba que se van a iterar con el useCasesTest
    const useCasesTest = [
        {
            a: 1, b: 2, operation: 'add', expected: 3
        },
        { a: 3, b: 2, operation: 'multiply', expected: 6 },
        { a: 10, b: 2, operation: 'divide', expected: 5 },
        { a: 10, b: 0, operation: 'divide', expected: 'Error' },
        { a: 10, b: 2, operation: 'subtract', expected: 8 },
        { a: 10, b: 2, operation: 'add', expected: 12 },
    ]

    it.each(useCasesTest)('Debería retornar $expected cuando $a y $b son $operation', ({ a, b, operation, expected }) => {
        render(<Calculator a={a} b={b} operation={operation} />)
        const result = screen.getByText(`Result: ${expected}`);
        expect(result).toBeInTheDocument();
    })
})
