import {create} from 'zustand';
import {getQuestions} from '../database/databaseAction';
import {getCurrentQuestion} from '../contrants/helper';

const cq = getCurrentQuestion();
const currentQuestion = create(set => ({
  question: cq,
  isSolved: () => set(state => ({count: state.count + 1})),
  decrease: () => set(state => ({count: state.count - 1})),
  reset: () => set({count: 0}),
}));

export default currentQuestion;
