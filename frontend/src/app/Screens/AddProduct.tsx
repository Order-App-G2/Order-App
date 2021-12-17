import React, { Component } from 'react'
import { FormHeader, FormInput, FormButton } from './SignIn';
import './SignUp.css'
import { createProduct } from '../../redux/actions/userAction'
import { connect } from "react-redux";
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './AddProduct.css'

interface SignUpProps {
    createProduct: (title: string, content: string, price: number, category: string) => any

}

interface SignUpState {
    title: string,
    content: string,
    price: number,
    category: string
}


export class AddProduct extends Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);

        this.state = {
            title: '',
            content: '',
            price: 0,
            category: ''
        }
    }


    handleSubmitProduct = (e: Event) => {
        e.preventDefault();
        this.props.createProduct(this.state.title, this.state.content, this.state.price, this.state.category)
    }

    returnDropDownWithCategoryFood = () => {
        return (
            // <Dropdown>
            //             <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            //                 Dropdown Button
            //             </Dropdown.Toggle>

            //             <Dropdown.Menu variant="dark">
            //                 <Dropdown.Item href="#/action-1" active>
            //                     Action
            //                 </Dropdown.Item>
            //                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            //                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            //                 <Dropdown.Divider />
            //                 <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
            //             </Dropdown.Menu>
            //         </Dropdown>
            <form className='dropDown' action="/action_page.php">
                <label  className='labelDropDown'>Choose a car:</label>
                <select  className='selectDropDown' name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
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
