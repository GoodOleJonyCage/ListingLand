
export const ListingHomeItem = (props) => {

    return <>
        <div className="col-sm-12">
            <div className="listing_full">
                <div className="image">
                    <a data-fancybox="images" data-type="image" data-src="#"  >
                        <img src={props.listing.images.length > 0 ? props.listing.images[0].imageSrc : "images/no-image-available.jpeg"} alt="latest property" className="img-responsive " />
                    </a>
                    <span className="tag_t">For Sale</span>
                    <span className="tag_l">Featured</span>
                </div>
                <a href={'/viewlisting?listingid=' + props.listing.listingID}>
                    <div className="listing_full_bg">
                        <div className="listing_inner_full">
                            <span><a href="#"><i className="icon-like"></i></a></span>
                            <a href="#.">
                                <h3>{props.listing.name}</h3>
                                <p>{props.listing.location.city.name}, {props.listing.location.region.name} {props.listing.location.country.name}</p>
                            </a>
                            <div className="favroute clearfix">
                                <div className="property_meta"><span><i className="icon-select-an-objecto-tool"></i>{props.listing.area} sq ft</span><span><i className=" icon-bed"></i>{props.listing.bedrooms} Bedrooms</span><span><i className="icon-safety-shower"></i>{props.listing.bathrooms} Bathrooms</span><span className="border-l">${props.listing.price}</span></div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </>
}