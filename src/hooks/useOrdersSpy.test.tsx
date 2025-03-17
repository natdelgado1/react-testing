import { describe, beforeEach, vi, Mock, MockInstance, afterEach, it, expect } from "vitest";
import { renderHook, waitFor } from '@testing-library/react';
import * as ReactRouter from 'react-router-dom';
import * as AuthContext from '../context/AuthContext'; //se importa todo lo que hay en el archivo y se asigna a la variable AuthContext
import * as OrderService from '../services/getOrders';
import { useOrders } from "./userOrders";
import { act } from "react";

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn()
}))



describe('userOrdersSpy', () => {
    let userSessionSpy: MockInstance;
    let getOrdersSpy: MockInstance;
    const mockNavigate = vi.fn();

    beforeEach(() => {
        userSessionSpy = vi.spyOn(AuthContext, 'useSession');
        getOrdersSpy = vi.spyOn(OrderService, 'getOrders');

        (ReactRouter.useNavigate as Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    })

    afterEach(() => {
        vi.restoreAllMocks();


    })

    it('deberia mostrar un error', async () => {
        userSessionSpy.mockReturnValue({ user: { id: 1 } });
        getOrdersSpy.mockRejectedValue(new Error('Api Error'));
        const { result } = renderHook(() => useOrders());
        
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();

        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Failed to fetch orders. Please try again later.');
        expect(getOrdersSpy).toHaveBeenCalledTimes(1);
    })

}) //es una funcion que se va a ejecutar antes de cada caso de prueba
