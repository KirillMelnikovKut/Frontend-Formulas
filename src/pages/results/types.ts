interface QuizFinishResult {
  correct_answer: string;
  is_correct: boolean;
  question: string;
  selected_answer: string;
}

export interface QuizFinishDto {
  correct_answers: number;
  incorrect_answers: number;
  results: QuizFinishResult[];
}
