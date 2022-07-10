import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { textSpanEnd } from "typescript";
import Rodape from ".";
import { useListaDeParticipantes } from "../../state/hook/useListaDeparticipantes";

jest.mock('../../state/hook/useListaDeparticipantes', () => {
    return{
        useListaDeParticipantes: jest.fn()
    }
})

const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
    return{
        useNavigate: () => mockNavegacao
    }
})

describe('quando não existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    test('a brincadeira não pode ser iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>)
        const botao = screen.getByRole('button')
        expect(botao).toBeDisabled()
    })
})

describe('quando existem participantes suficientes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Josef'])
    })

    test('a brincadeira pode ser iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>)
        const botao = screen.getByRole('button')
        expect(botao).not.toBeDisabled()
    })

    test('a brincadeira foi iniciada', () => {
        render(<RecoilRoot><Rodape /></RecoilRoot>)
        const botao = screen.getByRole('button')
        fireEvent.click(botao)
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    })
})