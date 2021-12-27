import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPartnerProducts } from '../../redux/actions/userAction';


interface PartnerProductListState {

}

interface PartnerProductListProps {
    getPartnerProducts: () => any,
}

export class PartnerProductList extends Component<PartnerProductListProps, PartnerProductListState> {

    constructor(props: PartnerProductListProps) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getPartnerProducts()
    }


    render() {
        return (
            <div>
                My products
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
        getPartnerProducts: () => dispatch(getPartnerProducts())
    }
}

export default connect(mapDispatchToProps,mapStateToProps)(PartnerProductList)
