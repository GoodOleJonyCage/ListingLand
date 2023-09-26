import { useEffect, useState } from 'react'
import { GetListings } from '../Services/Services'
import { Loading } from './Loading'
 
export const HeaderListings = () => {

    //const navigate = useNavigate();
    const [listings, setlistings] = useState([]);
    const [loaded, setloaded] = useState(false);

    const loadData = async () => {

        setloaded(false);

        const vm = await GetListings();
        setlistings(vm);
        //console.log(vm);

        setloaded(true);

        loadScript();
    }

    const loadScript = async () => {

        let script = document.createElement("script");
        script.src = "js/owl.carousel.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/functions.js";
        script.async = true;
        document.body.appendChild(script);
    }

    useEffect(() => {
        loadData();  
    }, []);

    return <>
        {
            !loaded  ? <Loading></Loading> :
                <div id="nav_slider" className="owl-carousel">
                    {
                        listings.map((listing, index) => {
                            return <div className="item menu-properties" key={index}>
                                <a href={'/viewlisting?listingid=' + listing.listingID}>
                                    <div className="image bottom15">
                                        <img src={listing.images.length > 0 ? listing.images[0].imageSrc : "images/no-image-available.jpeg"} alt="Featured Property" />
                                        <span className="nav_tag yellow text-uppercase">for rent</span>
                                    </div>
                                    <h4><a href="property_detail1.html">{listing.name}</a></h4>
                                    <p>{listing.location.city.name},{listing.location.region.name} {listing.location.country.name}</p>
                                </a>
                            </div>
                        })
                    }
                </div>
        }
    </>

}