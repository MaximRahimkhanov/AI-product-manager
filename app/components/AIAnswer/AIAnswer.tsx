import { Product } from '@prisma/client';

import style from './AIAnswer.module.scss';

interface AIAnswerProps {
  aiResult: Omit<Product, 'id' | 'createdAt'>;
}

const AIAnswer = ({ aiResult }: AIAnswerProps) => {
  return (
    <div className={style.wrapper}>
      <ul className={style.ul}>
        AI результат
        <li>Name: {aiResult.name}</li>
        <li>Quantity: {aiResult.quantity}</li>
        <li>Category: {aiResult.category}</li>
        <li>Description: {aiResult.description}</li>
      </ul>
    </div>
  );
};

export default AIAnswer;
