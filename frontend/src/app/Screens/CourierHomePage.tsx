import React, { Component } from 'react'
import Card from '../Components/Card/Card';
import './CourierHomePage.css'

interface CourierHomePageProps {
}

interface CourierHomePageState {

}


export default class CourierHomePage extends Component<CourierHomePageProps, CourierHomePageState > {


    render() {
        return (
            <div className="homePage">
                hi courier page 
                <div className='cardWrapper'>
                <Card >
                    order
                </Card>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
     userType: state.authReducer.type
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        
    }
}
