import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import { deleteIngredient } from '../../services/slices/ingredients-slice';
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    // dispatch = useDispatch
    // экшн-функция - deleteIngredient   () => {type, payload}

    // dispatch ()
    const dispatch = useDispatch();

    // slice = переменные + функции + фетчи
    const handleMoveDown = () => {};

    const handleMoveUp = () => {};

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
