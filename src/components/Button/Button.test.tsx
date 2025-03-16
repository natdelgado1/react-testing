import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Button } from './Button';
import '@testing-library/jest-dom';


describe('</Button>', () => {
    it('Debería renderizar el botón', () => {
        render(<Button label="click" />)
        const button = screen.getByText("click");
        expect(button).toBeInTheDocument(); 
    })

    it('Debería llamar a la función onClick cuando se hace clic en el botón', async () => {
        //Patron AAA
        //Arrange (Preparar)
        //Act (Ejecutar)
        //Assert (Afirmar)

        const handleClick = vi.fn();
        render(<Button label="click" onClick={handleClick} />)
        const button = screen.getByText("click");
        await act(()=>{
            fireEvent.click(button);

        })
        expect(handleClick).toHaveBeenCalledTimes(1);
    })


})