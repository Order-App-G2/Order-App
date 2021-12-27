import React, { Component } from 'react';
import classes from './HomePage.module.css';
import mealsImage from '../../assets/meals.jpg';
import { connect } from "react-redux";
import MealsSummary from '../Meals/MealsSummary';
import Modal from '../Components/Modal/Modal';
import './CustomerHomePage.css'
import { getProduct } from './../../redux/actions/userAction';
import MealItem from '../Meals/MealItem';
import { Link } from 'react-router-dom';
import Search from './Search';
import {FormInput} from './SignIn' 

interface CustomerHomePageProps {
    getProduct: () => any, 
    products: any[]
}

interface CustomerHomePageState {
    filteredProducts: any[],
}


export class CustomerHomePage extends Component<CustomerHomePageProps, CustomerHomePageState> {

    constructor(props: CustomerHomePageProps) {
        super(props);
        this.state = {
            filteredProducts: this.props.products
        }
    }

    componentDidMount() {
        this.props.getProduct()
    }

    componen(prevProps: CustomerHomePageProps, prevState: CustomerHomePageState) {
        if(this.props.products !== prevProps.products){
            this.setState({ filteredProducts: prevProps.products })
        }
    }

    
    handleSearchChange = (e: any) => {
        const filterName = String(e.target.value);
        if(!filterName || filterName.length <= 0){
            this.setState({ filteredProducts: this.props.products });
            return;
        }
        const _filteredProducts = this.props.products.filter((product)=>{
            if(product.title.toLowerCase().includes(filterName)){
                return product;
            }
        });
        this.setState({ filteredProducts: _filteredProducts })
    }

    renderAvailableMeals = () => {
        return this.state.filteredProducts.map((meal: any) => {
            return (  <MealItem partnerId={meal.partner_id} product_id={meal.product_id} title={meal.title} price={meal.price} category={meal.category} content={meal.content} /> )
        });
    }

    render() {
        return (
            <div className="homePage">
                <div className={classes['main-image']}>
                    <div className={classes.container}>
                        <img src={mealsImage} alt='A table full of delicious food!' />
                    </div>
                </div>
                <div className={classes.homePage}>
                    <MealsSummary />
                    {/* <Input   */}
                    <FormInput description="search" placeholder="Search by restaurant" type="text"  onChange={this.handleSearchChange} />
                    <div className='wrapCard'>
                    {this.renderAvailableMeals()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        userType: state.authReducer.type, 
        products: state.userReducer.allProducts
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        getProduct: () => dispatch(getProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHomePage)