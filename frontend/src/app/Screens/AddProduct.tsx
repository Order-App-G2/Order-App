import React, { Component } from 'react'
import { FormHeader, FormInput, FormButton } from './SignIn';
import './SignUp.css'
import { createProduct } from '../../redux/actions/userAction'
import { connect } from "react-redux";
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './AddProduct.css'

interface SignUpProps {
    createProduct?: (title: string, content: string, price: number, category: string) => any
}

interface SignUpState {
    title: string,
    content: string,
    price: number,
    category: string,
    allCategories: string[],
}


export class AddProduct extends Component<SignUpProps, SignUpState> {
    private readonly allCategoriesMockup = [
        'Fast Food',
        'Pizza',
        'Japanese',
        'Other',
    ]
    constructor(props: SignUpProps) {
        super(props);

        this.state = {
            title: '',
            content: '',
            price: 0,
            category: '',
            allCategories: this.allCategoriesMockup,
        }
    }

    componentDidMount(){
        // Retrieve all categories from backend
        // fill redux store with all categories
    }

    handleSubmitProduct = (e: Event) => {
        e.preventDefault();
        this.props.createProduct && this.props.createProduct(this.state.title, this.state.content, this.state.price, this.state.category)
    }

    returnDropDownWithCategoryFood = () => {
        return (
            <form className='dropDown' action="/action_page.php">
                <label  className='labelDropDown'>Choose a category:</label>
                <select  className='selectDropDown' name="food-categories" id="food-categories">
                {this.state.allCategories.map((c)=>{
                    return (
                        <option value={c.toLowerCase()}>{c}</option>
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
                    <FormInput description="Product title" placeholder="Enter your product title" type="text" onChange={(e: any) => { this.setState({ title: e.target.value }) }} />
                    <FormInput description="Product content" placeholder="Enter your product content" type="text" onChange={(e: any) => { this.setState({ content: e.target.value }) }} />
                    <FormInput description="Product price" placeholder="Enter your product price" type="text" onChange={(e: any) => { this.setState({ price: e.target.value }) }} />
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

    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        createProduct: (title: string, content: string, price: number, category: string) => dispatch(createProduct(title, content, price, category))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
