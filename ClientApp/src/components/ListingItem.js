

export const ListingItem = (props) => {
     
    return <>
        <div   className="col-sm-6">
            <div className="property_item heading_space">
                <div className="property_head text-center">
                    <h3 className="captlize">{props.listing.name}</h3>
                    <p>{props.listing.location.city.name}, {props.listing.location.region.name} {props.listing.location.country.name}</p>
                </div>
                <div className="image">
                    <a data-fancybox="images" data-type="image" data-src="#"  >
                        <img src={props.listing.images.length > 0 ? props.listing.images[0].imageSrc : "images/props.listing1.jpg"} alt="latest property" className="img-responsive " />
                    </a> 
                    <div className="price clearfix">
                        <span className="tag">For Sale</span>
                    </div>
                </div>
                <a href={'/viewprops.listing?props.listingid=' + props.listing.listingID}>
                    <div className="proerty_content">
                        <div className="property_meta props.listing-icon-container">
                            <span><i className="icon-select-an-objecto-tool"></i>{props.listing.area} sq ft</span>
                            <span><i className="icon-bed"></i>{props.listing.officeRooms} Office Rooms</span>
                            <span><i className="icon-safety-shower"></i>{props.listing.bathrooms} Bathrooms</span>
                        </div>
                        <div className="property_meta props.listing-icon-container">
                            <span className="props.listing-icon">
                                <span>FrontYard</span>
                                {props.listing.frontyard ? <span className="font-wingdings color-green" >&#252;</span> : <span className="font-wingdings color-red" >&#x2716;</span>}
                            </span>
                            <span className="props.listing-icon">
                                <span>BackYard</span>
                                {props.listing.backyard ? <span className="font-wingdings color-green" >&#252;</span> : <span className="font-wingdings color-red" >&#x2716;</span>}
                            </span>
                            <span><i className="icon-garage"></i>{props.listing.garages} Garage</span>
                        </div>
                        {/*<div className="proerty_text">*/}
                        {/*    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam power nonummy nibh tempor*/}
                        {/*        cum soluta nobis…*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        <div className="favroute clearfix">
                            <p className="pull-md-left">${props.listing.price}</p>
                        </div>
                        <div className="favroute clearfix">
                            <p className="pull-md-left">{props.listing.daysAgo} Days Ago</p>
                            <ul className="pull-right">
                                <li><a href="#."><i className="icon-like"></i></a></li>
                                <li><a href="#four" className="share_expender" data-toggle="collapse"><i className="icon-share3"></i></a></li>
                            </ul>
                        </div>
                        <div className="toggle_share collapse" id="four">
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
    </>
}