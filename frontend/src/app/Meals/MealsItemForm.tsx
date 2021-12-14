import { useEffect, useRef, useState, useContext } from 'react';
import { Fragment } from 'react';
import classes from './MealsItemForm.module.css';
import Input from '../Components/Input/Input';
// import AuthContext, { UserType } from '../../../store/auth-contex';
import { Link } from 'react-router-dom';
// import dataSource from '../../../dataSource';

const MealItemForm = (props: any) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef();
    // const authCtx = useContext(AuthContext);
    // const history = useHistory();
    // const isLoggedIn=authCtx.isLoggedIn;
    // const userType = authCtx.userType;

    useEffect(()=>{
        console.log(props);
    },[])
    const submitHandler = (event: any) => {
        event.preventDefault();

        // const enteredAmount = amountInputRef.current.value;
        // const enteredAmountNumber = +enteredAmount;


        // if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
        //     setAmountIsValid(false)
        //     return;
        // }

        // props.onAddToCart(enteredAmountNumber);
    };
    

    // const deleteHandler = async () => {
    //     const response = window.confirm(`Are you sure you want to delete ${props.name}`);
    //     if(response){
    //         await dataSource.delete({ source: "meal", options: { id: props.id }});
    //         window.location.reload();
    //     }
    // }

    return (
        <Fragment>
        <form className={classes.form} onSubmit={submitHandler}>
           {<Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />}
           { <button className={classes.add}>+ Add</button>}
            {!amountIsValid && <p>Please enter a valid amount (1-5). </p>}
            <div className={classes.buttons}>
            <Link to={{ pathname: `mealDetails/${props.id}` }}>
                {<button className={classes.viewDetailsLogIn}>Details </button>}
            </Link>
           </div>
            {<button className={classes.delete}>Delete</button>}
        </form>
            </Fragment>
    );
}

export default MealItemForm;