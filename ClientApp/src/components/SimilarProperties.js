import { useState, useEffect } from 'react'
import {  GetListings } from '../Services/Services'
import { Loading } from './Loading'

export const SimilarProperties = () => {

    const [similarlistings, setsimilarlistings] = useState(null);
    const [loaded, setloaded] = useState(false);

    const loadData = async () => {
         
        const listings = await GetListings();
        setsimilarlistings(listings);
        //console.log(listings);

        setloaded(true);
    }

    const loadScript = () => {

        let script = document.createElement("script");
        script.text = `$("#div-similar-properties").owlCarousel({
                        autoPlay: true,
                        items: 3,
                        itemsDesktop: [1199, 10],
                        itemsDesktopSmall: [979, 10],
                        itemsTablet: [768, 8],
                        itemsMobile: [479, 4],
                        pagination: true,
                        responsiveRefreshRate: 100,
                        afterInit: function (el) {
                            el.find(".owl-item").eq(0).addClass("synced");
                        }
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
            similarlistings === null ? <Loading></Loading> :
                <div className="three-item owl-carousel" id="div-similar-properties">
                    {
                        similarlistings.map((p, i) => {

                            return <div key={i} className="item clickable  ">
                                <div className="property_item heading_space">
                                    <a data-fancybox="images" data-type="image" data-src="#">
                                        <div className="image">
                                            <img src={p.images.length > 0 ? p.images[0].imageSrc : "images/no-image-available.jpeg"} alt="latest property" className="img-responsive " />
                                            <div className="price clearfix">
                                                <span className="tag pull-right">${p.price}</span>
                                            </div>
                                            <span className="tag_t">For Sale</span>
                                            <span className="tag_l">Featured</span>
                                        </div>
                                    </a>
                                    <a href={'/viewlisting?listingid=' + p.listingID}>
                                        <div className="proerty_content">
                                            <div className="proerty_text">
                                                <h3 className="captlize"><a href="#.">{p.name}</a></h3>
                                                <p>{p.location.city.name},{p.location.region.name} {p.location.country.name}</p>
                                            </div>
                                            <div className="property_meta transparent listing-icon-container">
                                                <span><i className="icon-select-an-objecto-tool"></i>{p.bedrooms} Bedrooms</span>
                                                <span><i className="icon-bed"></i>{p.officeRooms} Office Rooms</span>
                                                <span><i className="icon-safety-shower"></i>{p.bathrooms} Bathroom</span>
                                            </div>
                                            <div className="property_meta transparent  listing-icon-container">
                                                <span className="listing-icon">
                                                    <span>FrontYard</span>
                                                    {p.frontyard ? <span className="font-wingdings color-green" >&#252;</span> : <span className="font-wingdings color-red" >&#x2716;</span>}
                                                </span>
                                                <span className="listing-icon">
                                                    <span>BackYard</span>
                                                    {p.backyard ? <span className="font-wingdings color-green" >&#252;</span> : <span className="font-wingdings color-red" >&#x2716;</span>}
                                                </span>
                                                <span><i className="icon-garage"></i>{p.garages} Garage</span>
                                            </div>
                                            <div className="property_meta transparent listing-icon-container bottom30" >
                                                <span><i className="icon-select-an-objecto-tool"></i>{p.area} sq ft</span>
                                                <span><i className="icon-safety-shower"></i>${p.price}</span>
                                                <span>{p.postedOnStr}</span>
                                            </div>
                                            <div className="favroute clearfix">
                                                <p className="pull-md-left"><i className="icon-calendar2"></i> {p.daysAgo} Days ago </p>
                                                {/*<ul className="pull-right">*/}
                                                {/*    <li><a href="#."><i className="icon-like"></i></a></li>*/}
                                                {/*    <li><a href="#five" className="share_expender" data-toggle="collapse"><i className="icon-share3"></i></a></li>*/}
                                                {/*</ul>*/}
                                            </div>
                                            <div className="toggle_share collapse" id="five">
                                                <ul>
                                                    <li><a href="#." className="facebook"><i className="icon-facebook-1"></i> Facebook</a></li>
                                                    <li><a href="#." className="twitter"><i className="icon-twitter-1"></i> Twitter</a></li>
                                                    <li><a href="#." className="vimo"><i className="icon-vimeo3"></i> Vimeo</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        })
                    }
                </div>
        }
    </>
}