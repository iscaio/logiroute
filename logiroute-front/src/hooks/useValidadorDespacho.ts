import { NotificationService } from "../services/NotificationService";
import type { Encomenda, Motorista } from "../types";

export function validarDespachoLogistico(
  encomenda: Encomenda | null,
  motorista: Motorista | null,
): boolean {
  if (!encomenda || !motorista) return false;

  const { pesoPacote, largura } = encomenda;
  const { capacidadeMax, modeloVeiculo } = motorista;

  if (pesoPacote > capacidadeMax) {
    NotificationService.error(
      `Bloqueio operacional: o peso da carga (${pesoPacote}kg) excede a capacidade máxima do veículo ${modeloVeiculo} (${capacidadeMax}kg).`,
    );
    return false;
  }

  if (modeloVeiculo.toLowerCase().includes("moto") && largura > 60) {
    NotificationService.warning(
      `Alerta de segurança: encomendas com largura superior a 60cm não podem ser despachadas via motocicleta.`,
    );
    return false;
  }

  return true;
}
