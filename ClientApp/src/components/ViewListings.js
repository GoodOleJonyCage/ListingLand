import { useState, useEffect } from 'react'
import { GetListings } from '../Services/Services'
import { PagedListings } from './PagedListings'
import { Loading } from './Loading'
import { Search } from './Search'

export const ViewListings = () => {

    const [listings, setlistings] = useState([]);
    const [loading, setloading] = useState(false);

    const loadData = async () => {

        setloading(true);

        const listings = await GetListings();
        setlistings(listings);
        //console.log(listings);

        setloading(false);

        let script = document.createElement("script");
        script.src = "js/functions.js";
        script.async = true;
        document.body.appendChild(script);
    }

    useEffect(() => {
        loadData();
    }, []);

    return <>
        <section id="listing1" className="listing1 padding_top">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-md-9">
                                <h2 className="uppercase">PROPERTY LISTINGS</h2>
                                <p className="heading_space">We have Properties in these Areas View a list of Featured Properties.</p>
                            </div>
                            <div className="col-md-3">
                                <form className="callus">
                                    <div className="single-query">
                                        <div className="intro">
                                            <select>
                                                <option className="active">Default Order</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            {
                                loading ? <Loading></Loading> :
                                    listings.length === 0 ? <div className="highlight-error">No Records found</div> :
                                        <PagedListings  listings={listings}></PagedListings>
                            }
                        </div>
                        {/*<div className="padding_bottom text-center">*/}
                        {/*    <ul className="pager">*/}
                        {/*        <li><a href="#">1</a></li>*/}
                        {/*        <li className="active"><a href="#">2</a></li>*/}
                        {/*        <li><a href="#">3</a></li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>
                    <Search setloading={setloading} setlistings={setlistings}></Search>
                </div>
            </div>
        </section>
    </>
}