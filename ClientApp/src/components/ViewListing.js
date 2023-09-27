import { useState, useEffect } from 'react'
import { GetListing,GetListings } from '../Services/Services'
import { useSearchParams } from 'react-router-dom'
import { Loading } from './Loading'
/*import Moment from 'react-moment';*/
//import { useNavigate } from 'react-router-dom';

export const ViewListing = (props) => {

    const [vm, setvm] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [similarlistings, setsimilarlistings] = useState([]);
    const [loaded, setloaded] = useState(false);
    //const navigate = useNavigate();

    const loadData = async () => {

        const newvm = await GetListing(searchParams.get("listingid"));
        setvm(newvm);
        //console.log(newvm);

        const listings = await GetListings();
        setsimilarlistings(listings);
        //console.log(listings);

        setloaded(true);

        let script = document.createElement("script");
        script.src = "js/range-Slider.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/owl.carousel.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/functions.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/jquery.cubeportfolio.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/selectbox-0.2.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/custom.js";
        script.async = true;
        document.body.appendChild(script);

         //console.log(newvm);
    }

    useEffect(() => {
        loadData();
    }, [loaded]);


    return <>
        {
            vm == null ? <Loading /> :
                <>
                    <section id="property" className="padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 listing1 property-details">
                                    <h2 className="text-uppercase">{vm.name }</h2>
                                    <p className=" "> {vm.location.city.name}, {vm.location.region.name} {vm.location.country.name}</p>
                                    <p className="bottom30">Posted On <i>{vm.postedOnStr}{/* <Moment format="DD MMM YYYY hh:mm:ss:A"> {vm.postedOn}</Moment>*/}</i></p>
                                    <div id="property-d-1" className="owl-carousel single">
                                        {
                                            vm.images.map((image, i) => {
                                                return <div className="item main-image-container" key={i}>
                                                        <a data-fancybox="images" data-type="image" data-src="#">
                                                            <img src={image.imageSrc} alt="image"></img>
                                                        </a>
                                                     </div>
                                            })
                                        }
                                    </div>
                                    <div id="property-d-1-2" className="owl-carousel single">
                                        {
                                            vm.images.map((image, i) => {
                                                return <div className="item" key={i} >
                                                    <img src={image.imageSrc} alt="image"  />
                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className="property_meta bg-black bottom40">
                                        <span><i className="icon-select-an-objecto-tool"></i>{vm.area} sq ft</span>
                                        <span><i className=" icon-microphone"></i>{vm.officeRooms} Office Rooms</span>
                                        <span><i className="icon-safety-shower"></i>{vm.bedrooms } Bathroom</span>
                                        <span><i className="icon-garage"></i>{vm.garages} Garage</span>
                                    </div>

                                    {
                                        vm.description.map((attribute, index) => {
                                            return <>
                                                <h2 key={index}  className="text-uppercase">{attribute.attributename}</h2>
                                                <p className="bottom30">{attribute.textValue}</p>
                                            </>
                                        })
                                    }

                                    {/*quick summary*/}
                                    <h2 className="text-uppercase bottom20">{vm.quickSummary[0].sectionName}</h2>
                                    <div className="row property-d-table bottom40">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <table className="table table-striped table-responsive">
                                                <tbody>
                                                    {
                                                        vm.quickSummary.map((attribute, index) => {

                                                            return <>
                                                                {
                                                                    attribute.attributeType === "CheckBox" ?
                                                                        <div key={index} className="">
                                                                            {
                                                                                attribute.attributeValues.length > 0 ?
                                                                                    <div className="listing-av-container ">
                                                                                        <div className="listing-av-checkbox-container-heading">{attribute.attributename}</div>
                                                                                        <div className="listing-av-checkbox-container">
                                                                                            <ul className="pro-list">
                                                                                                {
                                                                                                    attribute.attributeValues.map((av, i) => {
                                                                                                    return <li>
                                                                                                        {av.value}
                                                                                                         </li>
                                                                                                })}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <span className="text-danger">{attribute.errorMessage}</span>
                                                                                    </div>
                                                                                    :
                                                                                    <div className="listing-checkbox-container white">
                                                                                        <span>{attribute.attributename}</span>
                                                                                    </div>
                                                                            }
                                                                        </div> :
                                                                        <tr key={index}>
                                                                            <td>{attribute.attributename}</td>
                                                                            <td className="text-right">{attribute.textValue}</td>
                                                                        </tr>
                                                                }
                                                            </>

                                                        })
                                                    }
                                                     
                                                </tbody>
                                            </table>
                                        </div>
                                         
                                    </div>
                                    <h2 className="text-uppercase bottom20">Features</h2>
                                    <div className="row bottom40">
                                        {
                                            vm.images.map((image, i) => {
                                                return <div className="col-md-4 col-sm-4 col-xs-12">
                                                    <div className="pro-img">
                                                        <figure className="wpf-demo-gallery">
                                                            <img src={image.imageSrc} alt="image"  />
                                                            <figcaption className="view-caption">
                                                                <a data-fancybox-group="gallery" className="fancybox" href="images/property-details/property-d-1-f-1.jpg"><i className="icon-focus"></i></a>
                                                            </figcaption>
                                                        </figure>
                                                    </div>
                                                </div>
                                            })
                                        }
                                   
                                    </div>
                                         
                                        <h2 className="text-uppercase bottom20">Contact Agent</h2>
                                        <div className="row">
                                            <div className="col-sm-4 bottom40">
                                                <div className="agent_wrap">
                                                    <div className="image">
                                                        <img src="images/agent-one.jpg" alt="Agents"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 bottom40">
                                                <div className="agent_wrap">
                                                    <h3>Bohdan Kononets</h3>
                                                    <p className="bottom30">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh tempor cum soluta nobis consectetuer adipiscing eleifend option congue nihil imperdiet doming…</p>
                                                    <table className="agent_contact table">
                                                        <tbody>
                                                            <tr className="bottom10">
                                                                <td><strong>Phone:</strong></td>
                                                                <td className="text-right">(+01) 34 56 7890</td>
                                                            </tr>
                                                            <tr className="bottom10">
                                                                <td><strong>Mobile:</strong></td>
                                                                <td className="text-right">(+033) 34 56 7890</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Email Adress:</strong></td>
                                                                <td className="text-right"><a href="#.">bohdan@castle.com</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Skype:</strong></td>
                                                                <td className="text-right"><a href="#.">bohdan.kononets</a></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div   className="bottom15"></div>
                                                    <ul className="social_share">
                                                        <li><a href="#." className="facebook"><i className="icon-facebook-1"></i></a></li>
                                                        <li><a href="#." className="twitter"><i className="icon-twitter-1"></i></a></li>
                                                        <li><a href="#." className="google"><i className="icon-google4"></i></a></li>
                                                        <li><a href="#." className="linkden"><i className="fa fa-linkedin"></i></a></li>
                                                        <li><a href="#." className="vimo"><i className="icon-vimeo3"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 bottom40">
                                            <form className="callus">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Name" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="tel" className="form-control" placeholder="Phone Number" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" className="form-control" placeholder="Email" />
                                                </div>
                                                <div className="form-group">
                                                    <textarea className="form-control" placeholder="Message"></textarea>
                                                </div>
                                                <input type="submit" className="btn-blue uppercase border_radius" value="submit now" />
                                            </form>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <h2 className="text-uppercase top20">Similar Properties</h2>
                                                    <p className="bottom30">We have Properties in these Areas View a list of Featured Properties.</p>
                                                </div>
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
                                                                                <p className="pull-md-left"><i className="icon-calendar2"></i> {vm.daysAgo} Days ago </p>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </section>
                </>
        }
    </>
}