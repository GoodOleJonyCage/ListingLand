import { useState, useEffect } from 'react'
import { GetListings } from '../Services/Services'
import { Loading } from './Loading'
import { PagedHomeListings } from './PagedHomeListings'
import { Search } from './Search'

export const Home = () => {

    const [listings, setlistings] = useState([]);
    const [loaded, setloaded] = useState(false);

    const loadData = async () => {

        setloaded(false);

        const listings = await GetListings();
        setlistings(listings);
        //console.log(listings);

        setloaded(true);

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
                            
                        </div>
                        <div className="row">
                            {
                                !loaded && listings.length === 0 ? <Loading></Loading> :
                                    listings.length === 0 ? <div className="highlight-error">No Records found</div> :
                                        <PagedHomeListings listings={listings}></PagedHomeListings>
                            }
                        </div>
                    </div>
                    <Search setloaded={setloaded} setlistings={setlistings}></Search>
                </div>
            </div>
        </section>
        </>
}

 