import { useEffect, useState } from 'react'
import { GetListings } from '../Services/Services'
import { Loading } from './Loading'
 
export const HeaderListings = () => {

    //const navigate = useNavigate();
    const [listings, setlistings] = useState([]);
    const [loaded, setloaded] = useState(false);

    const loadData = async () => {

        const vm = await GetListings();
        setlistings(vm);
        //console.log(vm);

        setloaded(true);

    }

    const loadScript = async () => {

        let script = document.createElement("script");
        script.text = `  
                      $("#nav_slider").owlCarousel({
                        autoPlay: true,
                        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                        stopOnHover: true,
                        pagination: false,
                        navigation: true,
                        items: 3,
                        itemsDesktop: [1199, 3],
                        itemsDesktopSmall: [979, 2]
                      });`;
        script.async = true;
        document.body.appendChild(script);
      
    }

    useEffect(() => {

        if (!loaded)
            loadData();  

        loadScript();

    }, [loaded]);

    return <>
        {
            !loaded  ? <Loading></Loading> :
                <div id="nav_slider" className="owl-carousel header-carousel">
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