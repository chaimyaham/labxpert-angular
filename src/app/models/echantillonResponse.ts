interface Reactif {
  id: number;
  reactifNom: string;
  quantite: number;
}

interface EchantillonResponse {
  id: number;
  dateDeReception: string;
  echantillonCode: string;
  patientNom: string;
  utilisateurNom: string;
  assigned: boolean;
  createdAt: string;
  updatedAt: string;
  reactifAnalyses: Reactif[];
}

export default EchantillonResponse;
