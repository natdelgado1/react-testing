import {describe, it, expect} from 'vitest'; 
//Se utiliza describe para agrupar los tests, it para cada test y expect para hacer las afirmaciones

describe('Mi primer test', ()=>{
    it('La suma de dos números', ()=>{
        const suma = (a,b)=>a+b;
        const resultado= suma(2,3);
        expect(resultado).toBe(5);

    })

    it('Dos textos iguales', ()=>{
        const text1 = 'Plazi';
        const text2 = 'Plazi';
        expect(text1).toBe(text2);
    })

    //Casos de prueba para comparar objetos
    it('Dos objetos iguales', ()=>{
        const obj1 = {a:1, b:2};
        const obj2 = {a:1, b:2};
        expect(obj1).toEqual(obj2);
    })

    //Casos de prueba para verificar dos arreglos
    it('Dos arreglos iguales', ()=>{
        const arr1 = [1,2,3];
        const arr2 = [1,2,3];
        expect(arr1).toEqual(arr2);
    })
    
})
