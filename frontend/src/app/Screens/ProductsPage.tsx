import React, { Component } from 'react'
import Card from '../Components/Card/Card'
import Meals from '../Meals/Meals';
import './ProductPage.css';

export class ProductsPage extends Component {
    render() {
        return (
            <div className=''>
                 <Card>
                        <ul>
                            <Meals/>
                        </ul>
                   </Card>
            </div>
        )
    }
}

export default ProductsPage
