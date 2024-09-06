export interface beckettCardDataType {
  setName?: string;
  playerName?: string;
  dateGraded?: string;
  centeringGrade?: string;
  cornerGrade?: string;
  edgesGrade?: string;
  surfacesGrade?: string;
  autographGrade?: string;
  finalGrade?: string;
  totalGradedCards?: string;
  cardsGradedAbove?: string;
  [key: string]: string | undefined;
}

export interface cgcCardDataType {
  serialNumber: string;
  cardName: string;
  game: string;
  year: string;
  language: string;
  cardSet: string;
  cardNumber: string;
  variant1: string;
  grade: string;
  graderNotes: string;
}

export interface psaCardDataType {
  SpecID: number;
  SpecNumber: string;
  LabelType: string;
  ReverseBarCode: boolean;
  Year: string;
  Brand: string;
  Category: string;
  CardNumber: string;
  Subject: string;
  Variety: string;
  IsPSADNA: boolean;
  IsDualCert: boolean;
  GradeDescription: string;
  CardGrade: string;
  TotalPopulation: number;
  TotalPopulationWithQualifier: number;
  PopulationHigher: number;
}