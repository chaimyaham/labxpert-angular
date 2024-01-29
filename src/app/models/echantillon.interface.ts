import { ReactifAnalyse } from "./reactifAnalyses.interface";
export interface Echantillon {
  id: number;
  dateDeReception: Date;
  echantillonCode: string;
  patientId: number;
  utilisateurId: number;
  assigned: boolean;
  createdAt: Date;
  updatedAt: Date;
  reactifAnalyses: ReactifAnalyse[];
}
