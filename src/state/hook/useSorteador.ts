import shuffle from "just-shuffle";
import { useSetRecoilState } from "recoil";
import { resultadoAmigoSecreto } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";
import { useListaDeParticipantes } from "./useListaDeparticipantes";

export const useSorteador = () => {
  const participantes = useListaDeParticipantes();
  const setResultado = useSetRecoilState(resultadoAmigoSecreto);

  return () => {
    const resultado = realizarSorteio(participantes);
    setResultado(resultado);
  };
};
