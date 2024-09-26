import React from 'react';
import "../Style/HomePage.css";
import Banner from './Banner';
import QuickSearch from './QuickSearch';
import Axios from 'axios';
import Modal from 'react-modal';


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
            restLoc: [],
            mealRest: []
        }
    }
    componentDidMount() {
        Axios({
            url: 'http://localhost:3103/placesDb',
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({ restLoc: res.data.places })
        }).catch(err => {
            console.log(err)
        })

        Axios({
            url: 'http://localhost:3103/mealType',
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({ mealRest: res.data.mealType })
        }).catch(err => {
            console.log(err)
        })
    }

    // For Modal
    handleModal = (state, value) => {

        this.setState({ [state]: value });
    }

    render() {

        const { restLoc, mealRest } = this.state

        return (
            <div>
                <Banner locationData={restLoc} />
                <QuickSearch mealDetails={mealRest} />
            </div>
        )
    }
}
export default HomePage;