export interface User {
  id?: number;
  nom: string;
  telephone: string;
  role: 'utilisateur' | 'administrateur';
  motDePasse: string;
}