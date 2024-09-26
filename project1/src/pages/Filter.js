import React from "react";
import queryString from "query-string";
import navHook from './nav';

import "../Style/Filter.css";
import Axios from "axios";

class FilterPage extends React.Component {
    constructor() {
        super();
        this.state = {
            loc: [],
            restFilter: [],
            Cuisine: [],
            sorting: 1,
            page: 1,
            meal: []
        }
    }
    componentDidMount() {

        const q = queryString.parse(window.location.search);
        console.log(q)
        const { mealType } = q;
        const int = parseInt(mealType);

        const filterObj = {
            mealType: int
        }

        Axios({
            url: 'http://localhost:3103/restaurantByCity',
            method: 'post',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restFilter: res.data.RestaurantByFilters, mealType: int })
            })
            .catch(err => { console.log(err) });
            
              // Mealtype
        Axios({
            url: `http://localhost:3103/meal/${int}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON'}
        })
        .then( res => {
            this.setState({ meal: res.data.mealById })
        })
        .catch((err => console.log(err)))


        Axios({
            url: 'http://localhost:3103/placesDb',
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({ loc: res.data.places })
        }).catch(err => {
            console.log(err)
        })
    }


    //filter page location
    handleLocation = (val) => {

        const { lcost, hcost, Cuisine, page, mealType } = this.state;
        const loca = val.target.value;
        const filterObj = {
            location: loca,
            lcost,
            hcost,
            Cuisine,
            page,
            mealType
        }

        Axios({
            url: 'http://localhost:3103/restaurantByCity',
            method: 'post',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restFilter: res.data.RestaurantByFilters, loca })
            })
            .catch(err => { console.log(err) });
    }

    //cuisine filter

    handleCuisine = (i) => {
        const { loca, lcost, hcost, sorting, page, mealType } = this.state;

        let tempCuisine = this.state.Cuisine.slice();

        if (tempCuisine.indexOf(i) === -1) {
            tempCuisine.push(i);
        } else {
            tempCuisine.splice(tempCuisine.indexOf(i), 1);
        }
        const filterObj = {
            location: loca,
            lcost,
            hcost,
            cuisineRest: tempCuisine.length > 0 ? tempCuisine : undefined,
            sorting,
            page,
            mealType
        }
        Axios({
            url: 'http://localhost:3103/restaurantByCity',
            method: 'post',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restFilter: res.data.RestaurantByFilters, Cuisine: tempCuisine })
            })
            .catch(err => { console.log(err) });
    }

    //cost filter

    handleCost = (lcost, hcost) => {
        const { loca, Cuisine, sorting, page, mealType } = this.state

        const filterObj = {
            location: loca,
            lcost,
            hcost,
            Cuisine,
            sorting,
            page,
            mealType
        }

        Axios({
            url: 'http://localhost:3103/restaurantByCity',
            method: 'post',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restFilter: res.data.RestaurantByFilters, lcost, hcost })
            })
            .catch(err => { console.log(err) });
    }

    handleSort = (sorting) => {
        const { loca, Cuisine, lcost, hcost, page, mealType } = this.state

        const filterObj = {
            location: loca,
            lcost,
            hcost,
            Cuisine,
            sorting,
            page,
            mealType
        }

        Axios({
            url: 'http://localhost:3103/restaurantByCity',
            method: 'post',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restFilter: res.data.RestaurantByFilters, sorting })
            })
            .catch(err => { console.log(err) });

    }

    handlePage = (page) => {

        const { loca, Cuisine, lcost, hcost, sorting, mealType } = this.state

        const filterObj = {
            location: loca,
            lcost,
            hcost,
            Cuisine,
            sorting,
            page,
            mealType
        }

        Axios({
            url: 'http://localhost:3103/restaurantByCity',
            method: 'post',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restFilter: res.data.RestaurantByFilters, page })
            })
            .catch(err => { console.log(err) });
    }


  // Navigate
  handleNavigate= (ss) => {
    this.props.navigate(`/details?restaurant=${ss}`);
}

    render() {
        const { loc, restFilter, meal} = this.state;
        console.log(meal)
        return (
            <div>
                {/* <!--Navbar--> */}
                <nav className="navbar bg-danger" data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>
                        {/* <form class="d-flex nav-form">
                            <button type="button" class="btn btn-danger">Login</button>
                            <button type="button" class="btn btn-outline-light">Create an account</button>
                        </form> */}
                    </div>
                </nav>

                {/* <!--Filter Page--> */}
                <div className="container mb-5">
                   
                    <h2 className="filter-heading mt-3">{meal.name} Places in Mumbai</h2>

                    {/* <!--Filters--> */}
                    <div className="filter-box mt-2 pb-4">
                        <h5 className="filter-heading mt-2">Filters</h5>

                        <p className="filter-subheading">Select Location</p>

                        <select className="form-control selectLocation" onChange={this.handleLocation}>
                            <option value="0" disabled selected>Select Location</option>
                            {
                                loc?.map((item) => {
                                    return (
                                        <option value={item.city_id}>{item.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <p className="filter-subheading mt-4">Cuisine</p>

                        <input type="checkbox" id="North_Indian" name="Cuisine" value="North Indian" onChange={() => this.handleCuisine(1)} /> <label for="North_Indian" className="filter-content">North Indian</label> <br />
                        <input type="checkbox" id="South_Indian" name="Cuisine" value="South Indian" onChange={() => this.handleCuisine(2)} /> <label for="South_Indian" className="filter-content">South Indian</label> <br />
                        <input type="checkbox" id="Chinese" name="Cuisine" value="Chinese" onChange={() => this.handleCuisine(3)} /> <label for="Chinese" className="filter-content">Chinese</label> <br />
                        <input type="checkbox" id="Fast_Food" name="Cuisine" value="Fast Food" onChange={() => this.handleCuisine(4)} /> <label for="Fast_Food" className="filter-content">Fast Food</label> <br />
                        <input type="checkbox" id="Street_Food" name="Cuisine" value="Street Food" onChange={() => this.handleCuisine(5)} /> <label for="Street_Food" className="filter-content">Street Food</label> <br />

                        <p className="filter-subheading mt-4">Cost For Two</p>

                        <input type="radio" id="500" name="costfortwo" value="Less than 500" onChange={() => this.handleCost(1, 500)} /> <label for="500" className="filter-content">Less than `500</label> <br />
                        <input type="radio" id="1000" name="costfortwo" value="500 to 1000" onChange={() => this.handleCost(500, 1000)} /> <label for="1000" className="filter-content">` 500 to ` 1000</label> <br />
                        <input type="radio" id="1500" name="costfortwo" value="1000 to 1500" onChange={() => this.handleCost(1000, 1500)} /> <label for="1500" className="filter-content">` 1000 to ` 1500</label> <br />
                        <input type="radio" id="2000" name="costfortwo" value="1500 to 2000" onChange={() => this.handleCost(1500, 2000)} /> <label for="2000" className="filter-content">` 1500 to ` 2000</label> <br />
                        <input type="radio" id="2000+" name="costfortwo" value="2000+" onChange={() => this.handleCost(2000, 5000)} /> <label for="2000+" className="filter-content">` 2000+</label> <br />

                        <h5 className="filter-heading mt-4">Sort</h5>

                        <input type="radio" id="ltoh" name="Sort" value="Price low to high" onClick={() => this.handleSort(1)} /> <label for="ltoh" className="filter-content">Price low to high</label> <br />
                        <input type="radio" id="htol" name="Sort" value="Price high to low" onClick={() => this.handleSort(-1)} /> <label for="htol" className="filter-content">Price high to low</label> <br />

                    </div>

                    {/* <!--Filter Result--> */}
                    <div className="result-box mt-2">

                        {/* <!-- Result --> */}
                        {restFilter.length != 0 ?
                            restFilter.map((res) => {

                                return (
                                    <div className="results" onClick={() => this.handleNavigate(res._id)}>
                                        <div className="d-flex">
                                            <div className="lt-box">
                                                <img src={res.thumb} alt="rest-img" className="img-fluid img-qs" />
                                            </div>
                                            <div className="rt-box">
                                                <h4 className="result-heading">{res.name}</h4>
                                                <p className="result-subheading">{res.city_name}</p>
                                                <p className="result-text">{res.address}</p>
                                            </div>
                                        </div>

                                        <hr style={{ color: "grey;" }} />

                                        <div className="d-flex">
                                            <div className="ll-box">
                                                <p className="result-text">CUISINES:</p>
                                                <p className="result-text">COST FOR TWO:</p>
                                            </div>
                                            <div className="rl-box">
                                                <p className="result-text-blue">{res.Cuisine.map(cu => `${cu.name}, `)}</p>
                                                <p className="result-text-blue">₹{res.cost}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <h3 className="text-center"> Sorry, No Results found... try other options </h3>}





                        {/* <!--Pagination--> */}
                        <div className="mt-5">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="/">
                                        <span> {'<'} </span>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePage(1)} >1</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePage(2)} >2</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePage(3)} >3</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePage(4)} >4</a></li>
                                <li className="page-item"><a className="page-link" href="#" onClick={() => this.handlePage(5)} >5</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="/">
                                        <span> {'>'} </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default navHook( FilterPage);


