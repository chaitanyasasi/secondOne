import React from 'react';
import navHook from './nav';


class QuickSearch extends React.Component {
    showFilter = (sr) => {
        this.props.navigate(`/filters?mealType=${sr}`);
    }
    render() {
        const { mealDetails } = this.props

        return (
            <div>
                <main className="container">
                    <section className="row">
                        <div className="col-12 pt-5">
                            <p className="h3 fw-bold quick">Quick Searches</p>
                            <p className="disc">Discover restaurants by type of meal</p>
                        </div>

                    </section>
                    <section className="row mt-4 mb-4">
                        <article className="d-lg-flex flex-wrap">


                            {
                                mealDetails?.map((item) => {
                                    return (

                                        <div className="col-lg-4 col-11 bg-white d-flex gap-4 m-3 rect-box" onClick={() => this.showFilter(item._id)} key={item.name}>
                                            <img src={`./images/${item.image}`} alt="meals" className="foodimg" />
                                            <div className="pt-4">
                                                <p className="quick fw-bold h5">{item.name}</p>
                                                <p className="disc">{item.content}</p>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </article>
                    </section>

                </main>
            </div>
        )
    }
}
export default navHook(QuickSearch);