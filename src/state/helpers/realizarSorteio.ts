import shuffle from "just-shuffle"

export function realizarSorteio (participantes : string[]) {
    const totalDeParticpantes = participantes.length
    const embaralhado = shuffle(participantes)
    const resultado = new Map<string, string>()
    for (let index = 0; index < totalDeParticpantes; index++) {
        const indiceDoAmigo = index === (totalDeParticpantes - 1) ? 0 : index + 1
        resultado.set(embaralhado[index], embaralhado[indiceDoAmigo])
    }
    return resultado
}