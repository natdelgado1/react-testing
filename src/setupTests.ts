import '@testing-library/jest-dom';
import {afterAll, afterEach, beforeAll} from 'vitest';
import {server} from './mocks/server';

//Antes de todos los test se ejecuta este codigo
beforeAll(()=>{
    server.listen()
})

//Despues de cada test se ejecuta este codigo se  reinicia el servidor
afterEach(()=>{
    server.resetHandlers()
})

//Despues de todos los test se ejecuta este codigo se cierra el servidor
afterAll(()=>{
    server.close()
})
