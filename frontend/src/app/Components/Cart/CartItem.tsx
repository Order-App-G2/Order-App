import classes from './CartItem.module.css';

export interface CardItemProps {
  name: string;
  price: number;
  amount: number;
  onRemove?: () => void;
  onAdd?: ()=> void;
}
const CartItem = (props: CardItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        {props.onRemove && <button onClick={props.onRemove}>−</button>}
        {props.onAdd && <button onClick={props.onAdd}>+</button>}
      </div>
    </li>
  );
};

export default CartItem;
