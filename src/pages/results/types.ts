export interface FormulaWithAnswer {
  formula: string;
  correctAnswer: string;
  givenAnswer: string;
}

export interface ResultsProps {
  formulasWithAnswers: FormulaWithAnswer[];
  completeDate: string;
  completionTime: string;
}
