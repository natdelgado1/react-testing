import { describe, it, expect, vi, Mock } from 'vitest';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getAuth } from '../../services/getAuth';
import { SessionProvider } from '../../context/AuthContext'
import { Login } from './Login';

vi.mock('../../services/getAuth', () => {
    return {
        getAuth: vi.fn()
    }
})

const mockGetAuth = getAuth as Mock

describe('<Login/>', () => {
    it('Debería mostrar un mensaje de error ', async () => {
        mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
        render(
            <SessionProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </SessionProvider>
        )

        const userNameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const buttonLogin = screen.getByRole('button', { name: 'Login' });
        await act(async () => {
            fireEvent.change(userNameInput, { target: { value: 'wrongUser' } })
            fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })
            fireEvent.click(buttonLogin)
        })
        const errorMessage = screen.getByText("Invalid credentials");
        expect(errorMessage).toBeInTheDocument();

    })
})
