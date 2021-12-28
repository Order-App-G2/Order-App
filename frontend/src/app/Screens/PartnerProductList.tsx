import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteProduct, getPartnerProducts } from '../../redux/actions/userAction';
import Card from '../Components/Card/Card';
import MealItem from '../Meals/MealItem';
import './PartnerProductList.css'

interface PartnerProductListState {
    isDelete: boolean
}

interface PartnerProductListProps {
    getPartnerProducts: () => any,
    deleteProduct: (product_id: any) => any,
    partnerProducts: any[]
}

export class PartnerProductList extends Component<PartnerProductListProps, PartnerProductListState> {

    constructor(props: PartnerProductListProps) {
        super(props);
        this.state = {
            isDelete: false 
        }
    }

    componentDidMount() {
        this.props.getPartnerProducts && this.props.getPartnerProducts()
    }


    handleDeleteButton = (id: any) => {
       this.props.deleteProduct(id)

       window.location.reload()
       this.setState({
        isDelete: true
       })
    }

    returnAllProducts = () => {

        return this.props.partnerProducts.map((meal: any) => {
            return (<MealItem handleDeleteButton={() => this.handleDeleteButton(meal.product_id)} deleteButton partnerId={meal.partner_id} product_id={meal.product_id} title={meal.title} price={meal.price} category={meal.category} content={meal.content} showButton />)
        });

    }

    render() {
        return (
            <div>
                <h1 className='headerTitle'>All of my products</h1>
                {this.returnAllProducts()}
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        partnerProducts: state.userReducer.partnerProducts
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        getPartnerProducts: () => dispatch(getPartnerProducts()),
        deleteProduct: (product_id: any) => dispatch(deleteProduct(product_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerProductList)
