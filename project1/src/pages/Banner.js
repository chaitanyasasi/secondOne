import Axios from 'axios';
import React from 'react';
import navHook from './nav';

class Banner extends React.Component {

    constructor() {
        super();
        this.state = {
            rest: [],
            inputText: undefined,
            suggestions: []
        }
    }

    handelLocation = (e) => {
        const Location = e.target.value;
        // sessionStorage.setState('Location', location);
        // console.log(Location)
        Axios({
            url: `http://localhost:3103/byloc/${Location}`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON' }
        }).then(res => {
            this.setState({ rest: res.data.RestaurantByCity })
        }).catch((err => console.log(err)));


    }
    handleInput = (event) => {
        const { rest } = this.state;
        const inputText = event.target.value;
        console.log(inputText)

        let suggestions = [];
        suggestions = rest.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestions })
        console.log(suggestions)
    }

    showSuggestion = () => {
        const { inputText, suggestions } = this.state;
        console.log(suggestions)

        if (suggestions.length == 0 && inputText == undefined) {
            return null;
        }

        if (suggestions.length > 0 && inputText == '') {
            return null;
        }

        if (suggestions.length == 0 && inputText) {
            return (
                <li>No Results Found !!</li>
            )
        }
        return (
            suggestions.map((item, index) => (

                <li key={index} className='suggList' onClick={() => this.selectRest(item._id)}>
                    <img src={item.thumb} className="sugImg" alt='sugImg' />
                    <span className='sugName'>{item.name}</span>
                    <span className='sugAddress'>{item.address}</span>
                </li>

            )

            ))
    };

    selectRest = (sr) => {
        this.props.navigate(`/details?restaurant=${sr}`)
    }

    render() {
        const { locationData } = this.props
        return (
            <div>
                <main className="container-fluid backimg">
                    <section className="row">
                        <div className="col-sm-12 col-lg-12 d-lg-flex d-none justify-content-end py-4">
                            {/* <button class="btn text-white me-3">Login</button>
                            <button class="btn text-white border border-1 border-light me-5">Create an account</button> */}
                        </div>
                        <div className="d-flex justify-content-center symbol">
                            <p className="icon bg-white text-danger fw-bold d-flex justify-content-center align-content-center pt-2">
                                e!
                            </p>
                        </div>
                        <p className="text-white text-center fs-1 fw-bold find pt-0">Find the best restaurants, cafés, and
                            bars
                        </p>
                    </section>
                    <div className="row mb-5 d-flex justify-content-center">
                        <div className='col-10 col-lg-2 mb-lg-5 mb-3 ms-3 '>
                            <select className="text-muted location ps-4" onChange={this.handelLocation}>
                                <option value="0" disabled selected>Please type a location</option>

                                {
                                    locationData?.map((item) => {
                                        return (
                                            <option value={item.city_id} key={item.city_id}>{item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className=" col-10 col-lg-4 ms-lg-3 ms-3 mb-lg-5 ">
                            <input placeholder="Please Search for restaurants" className='text-muted restaurants ps-4' onChange={this.handleInput} />
                            <ul className='suggBox'>{this.showSuggestion()}</ul>
                        </div>
                    </div>


                </main>

            </div>
        )
    }
}
export default navHook(Banner);