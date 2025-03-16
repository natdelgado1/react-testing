import { describe, it, expect, vi, Mock } from 'vitest';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getAuth } from '../../services/getAuth';
import { SessionProvider } from '../../context/AuthContext'
import { Login } from './Login';


vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})
vi.mock('../../services/getAuth', () => {
    return {
        getAuth: vi.fn()
    }
})

const mockNavigate = vi.fn()
const mockGetAuth = getAuth as Mock

describe('<Login/>', () => {
    const handleLogin = () => {
        return render(<SessionProvider>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </SessionProvider>)
    }
    it('Debería mostrar un mensaje de error ', async () => {
        mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
        handleLogin()

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

    it('Debería redirigir a /orders', async () => {
        mockGetAuth.mockResolvedValue({ success: true });
        handleLogin()
        const userNameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const buttonLogin = screen.getByRole('button', { name: 'Login' });

        await act(async () => {
            fireEvent.change(userNameInput, { target: { value: 'validUser' } })
            fireEvent.change(passwordInput, { target: { value: 'validPassword' } })
            fireEvent.click(buttonLogin)
        })
        await waitFor(() => {
            expect(mockGetAuth).toHaveBeenCalledWith("validUser", "validPassword")
            expect(mockNavigate).toHaveBeenCalledWith("/orders")
        })

    })

    //Caso de uso: Debería mostrar la contraseña solo showPassword es hide 
    it("Debería cambiar el tipo del input cuando se muestra la contraseña", async () => {
        handleLogin()
        const passwordInput = screen.getByPlaceholderText('Password');
        const togglePasswordButton = screen.getByRole('button', { name: 'show' })
        await act(async () => {
            fireEvent.click(togglePasswordButton)
        })
        expect(passwordInput).toHaveAttribute('type', 'text')
    })
}
)

