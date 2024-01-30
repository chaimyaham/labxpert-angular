import { ReactifAnalyse } from "./reactifAnalyses.interface";
export interface EchantillonRequest {
  dateDeReception: string | null;
  patientId: number;
  utilisateurId: number;
  reactifAnalyses: ReactifAnalyse[];
}
