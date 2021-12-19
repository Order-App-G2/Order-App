import React, { Component } from 'react'
import { FormHeader, FormInput, FormButton } from './SignIn';
import './SignUp.css'
import { createProduct, getCategory } from '../../redux/actions/userAction'
import { connect } from "react-redux";
import { Category } from '../Interfaces'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './AddProduct.css'

interface SignUpProps {
    getCategory: () => void,
    category: [],
    createProduct: (title: string, content: string, price: number, category_id: number) => any
}

interface SignUpState {
    title: string,
    content: string,
    price: number,
    category_id: number,
}


export class AddProduct extends Component<SignUpProps, SignUpState> {

    constructor(props: SignUpProps) {
        super(props);

        this.state = {
            title: '',
            content: '',
            price: 0,
            category_id: 0,
        }
    }

    componentDidMount() {
        // Retrieve all categories from backend
        // fill redux store with all categories
        this.props.getCategory()

        // this.props.getCategory && this.props.getCategory()
    }

    handleSubmitProduct = (e: Event) => {
        e.preventDefault();
        this.crateProduct();
        this.resetState();
    }

    crateProduct = () => {
        this.props.createProduct && this.props.createProduct(this.state.title, this.state.content, this.state.price, this.state.category_id + 1)
    }

    resetState = () => {
        this.setState({
            title: '',
            content: '',
            price: 0,
            category_id: 0,
        })
    }

    returnDropDownWithCategoryFood = () => {
        return (
            <form className='dropDown' action="/action_page.php">
                <label className='labelDropDown'>Choose a category:</label>
                <select className='selectDropDown' name="food-categories" id="food-categories" onChange={(e) => { this.setState({ category_id: parseInt(e.target.value) }) }}>
                    {this.props.category.map((c: Category) => {
                        return (
                            <option value={this.state.category_id} >{c.category}</option>
                        );
                    })}
                </select>
            </form>
        )
    }


    render() {
        return (
            <div id="AddProductPage">
                <FormHeader title="Add dishes to your products list" />
                <div className='AddProductBorder'>
                    <FormInput description="Product title" placeholder="Enter your product title" type="text" value={this.state.title} onChange={(e: any) => { this.setState({ title: e.target.value }) }} />
                    <FormInput description="Product content" placeholder="Enter your product content" type="text" value={this.state.content} onChange={(e: any) => { this.setState({ content: e.target.value }) }} />
                    <FormInput description="Product price" placeholder="Enter your product price" type="text" value={this.state.price} onChange={(e: any) => { this.setState({ price: e.target.value }) }} />
                    {this.returnDropDownWithCategoryFood()}
                    {/* <FormInput description="Product category" placeholder="Enter your product category" type="text" onChange={(e: any) => { this.setState({category: e.target.value  }) }} /> */}
                    <FormButton title="SAVE" onClick={this.handleSubmitProduct} />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state: any) {
    return {
        category: state.userReducer.foodCategory
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        createProduct: (title: string, content: string, price: number, category_id: number) => dispatch(createProduct(title, content, price, category_id)),
        getCategory: () => dispatch(getCategory()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
