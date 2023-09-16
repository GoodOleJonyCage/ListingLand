import { useState, useEffect } from 'react'
import { GetListing } from '../Services/Services'
import { useSearchParams } from 'react-router-dom'
import { Loading } from './Loading'

export const ViewListing = (props) => {

    const [vm, setvm] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const loadData = async () => {

        const newvm = await GetListing(searchParams.get("listingid"));
        setvm(newvm);

        //let script = document.createElement("script");
        //script.src = "js/range-Slider.min.js";
        //script.async = true;
        //document.body.appendChild(script);

        //script = document.createElement("script");
        //script.src = "js/owl.carousel.min.js";
        //script.async = true;
        //document.body.appendChild(script);

        let script = document.createElement("script");
        script.src = "js/functions.js";
        script.async = true;
        document.body.appendChild(script);

        //script = document.createElement("script");
        //script.src = "js/jquery.cubeportfolio.min.js";
        //script.async = true;
        //document.body.appendChild(script);

        //script = document.createElement("script");
        //script.src = "js/selectbox-0.2.min.js";
        //script.async = true;
        //document.body.appendChild(script);

        //script = document.createElement("script");
        //script.src = "js/custom.js";
        //script.async = true;
        //document.body.appendChild(script);

         //console.log(newvm);
    }

    useEffect(() => {
        loadData();
    }, []);


    return <>
        {
            vm == null ? <Loading /> :
                <>
                    <section id="property" className="padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 listing1 property-details">
                                    <h2 className="text-uppercase">{vm.name }</h2>
                                    <p className="bottom30"> {vm.location.city.name}, {vm.location.region.name} {vm.location.country.name}</p>
                                    <div id="property-d-1" className="owl-carousel single">
                                        {
                                            vm.images.map((image, i) => {
                                                return <div className="item" key={i}>
                                                        <img src={image.imageSrc} alt="image" />
                                                </div>
                                            })
                                        }
                                    </div>
                                    <div id="property-d-1-2" className="owl-carousel single">
                                        {
                                            vm.images.map((image, i) => {
                                                return <div className="item" key={i}>
                                                    <img src={image.imageSrc} alt="image" />
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
                                                            <img src={image.imageSrc} alt="image" />
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
                                                    <div className="item">
                                                        <div className="property_item heading_space">
                                                            <div className="image">
                                                                <a href="#."><img src="images/listing1.jpg" alt="latest property" className="img-responsive"/></a>
                                                                <div className="price clearfix">
                                                                    <span className="tag pull-right">$8,600 Per Month</span>
                                                                </div>
                                                                <span className="tag_t">For Sale</span>
                                                                <span className="tag_l">Featured</span>
                                                            </div>
                                                            <div className="proerty_content">
                                                                <div className="proerty_text">
                                                                    <h3 className="captlize"><a href="#.">Historic Town House</a></h3>
                                                                    <p>45 Regent Street, London, UK</p>
                                                                </div>
                                                                <div className="property_meta transparent">
                                                                    <span><i className="icon-select-an-objecto-tool"></i>4800 sq ft</span>
                                                                    <span><i className="icon-bed"></i>2 Office Rooms</span>
                                                                    <span><i className="icon-safety-shower"></i>1 Bathroom</span>
                                                                </div>
                                                                <div className="property_meta transparent bottom30">
                                                                    <span><i className="icon-old-television"></i>TV Lounge</span>
                                                                    <span><i className="icon-garage"></i>1 Garage</span>
                                                                    <span></span>
                                                                </div>
                                                                <div className="favroute clearfix">
                                                                    <p className="pull-md-left"><i className="icon-calendar2"></i>&nbsp;5 Days ago </p>
                                                                    <ul className="pull-right">
                                                                        <li><a href="#."><i className="icon-like"></i></a></li>
                                                                        <li><a href="#five" className="share_expender" data-toggle="collapse"><i className="icon-share3"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="toggle_share collapse" id="five">
                                                                    <ul>
                                                                        <li><a href="#." className="facebook"><i className="icon-facebook-1"></i> Facebook</a></li>
                                                                        <li><a href="#." className="twitter"><i className="icon-twitter-1"></i> Twitter</a></li>
                                                                        <li><a href="#." className="vimo"><i className="icon-vimeo3"></i> Vimeo</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div className="property_item heading_space">
                                                            <div className="image">
                                                                <a href="#."><img src="images/listing1.jpg" alt="latest property" className="img-responsive"/></a>
                                                                <div className="price clearfix">
                                                                    <span className="tag pull-right">$8,600 Per Month</span>
                                                                </div>
                                                                <span className="tag_t">For Sale</span>
                                                                <span className="tag_l">Featured</span>
                                                            </div>
                                                            <div className="proerty_content">
                                                                <div className="proerty_text">
                                                                    <h3 className="captlize"><a href="#.">Historic Town House</a></h3>
                                                                    <p>45 Regent Street, London, UK</p>
                                                                </div>
                                                                <div className="property_meta transparent">
                                                                    <span><i className="icon-select-an-objecto-tool"></i>4800 sq ft</span>
                                                                    <span><i className="icon-bed"></i>2 Office Rooms</span>
                                                                    <span><i className="icon-safety-shower"></i>1 Bathroom</span>
                                                                </div>
                                                                <div className="property_meta transparent bottom30">
                                                                    <span><i className="icon-old-television"></i>TV Lounge</span>
                                                                    <span><i className="icon-garage"></i>1 Garage</span>
                                                                    <span></span>
                                                                </div>
                                                                <div className="favroute clearfix">
                                                                    <p className="pull-md-left"><i className="icon-calendar2"></i>&nbsp;5 Days ago </p>
                                                                    <ul className="pull-right">
                                                                        <li><a href="#."><i className="icon-like"></i></a></li>
                                                                        <li><a href="#six" className="share_expender" data-toggle="collapse"><i className="icon-share3"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="toggle_share collapse" id="six">
                                                                    <ul>
                                                                        <li><a href="#." className="facebook"><i className="icon-facebook-1"></i> Facebook</a></li>
                                                                        <li><a href="#." className="twitter"><i className="icon-twitter-1"></i> Twitter</a></li>
                                                                        <li><a href="#." className="vimo"><i className="icon-vimeo3"></i> Vimeo</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div className="property_item heading_space">
                                                            <div className="image">
                                                                <a href="#."><img src="images/listing1.jpg" alt="latest property" className="img-responsive"/></a>
                                                                <div className="price clearfix">
                                                                    <span className="tag pull-right">$8,600 Per Month</span>
                                                                </div>
                                                                <span className="tag_t">For Sale</span>
                                                                <span className="tag_l">Featured</span>
                                                            </div>
                                                            <div className="proerty_content">
                                                                <div className="proerty_text">
                                                                    <h3 className="captlize"><a href="#.">Historic Town House</a></h3>
                                                                    <p>45 Regent Street, London, UK</p>
                                                                </div>
                                                                <div className="property_meta transparent">
                                                                    <span><i className="icon-select-an-objecto-tool"></i>4800 sq ft</span>
                                                                    <span><i className="icon-bed"></i>2 Office Rooms</span>
                                                                    <span><i className="icon-safety-shower"></i>1 Bathroom</span>
                                                                </div>
                                                                <div className="property_meta transparent bottom30">
                                                                    <span><i className="icon-old-television"></i>TV Lounge</span>
                                                                    <span><i className="icon-garage"></i>1 Garage</span>
                                                                    <span></span>
                                                                </div>
                                                                <div className="favroute clearfix">
                                                                    <p className="pull-md-left"><i className="icon-calendar2"></i>&nbsp;5 Days ago </p>
                                                                    <ul className="pull-right">
                                                                        <li><a href="#."><i className="icon-like"></i></a></li>
                                                                        <li><a href="#twoo" className="share_expender" data-toggle="collapse"><i className="icon-share3"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="toggle_share collapse" id="twoo">
                                                                    <ul>
                                                                        <li><a href="#." className="facebook"><i className="icon-facebook-1"></i> Facebook</a></li>
                                                                        <li><a href="#." className="twitter"><i className="icon-twitter-1"></i> Twitter</a></li>
                                                                        <li><a href="#." className="vimo"><i className="icon-vimeo3"></i> Vimeo</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div className="property_item heading_space">
                                                            <div className="image">
                                                                <a href="#."><img src="images/listing1.jpg" alt="latest property" className="img-responsive"/></a>
                                                                <div className="price clearfix">
                                                                    <span className="tag pull-right">$8,600 Per Month</span>
                                                                </div>
                                                                <span className="tag_t">For Sale</span>
                                                                <span className="tag_l">Featured</span>
                                                            </div>
                                                            <div className="proerty_content">
                                                                <div className="proerty_text">
                                                                    <h3 className="captlize"><a href="#.">Historic Town House</a></h3>
                                                                    <p>45 Regent Street, London, UK</p>
                                                                </div>
                                                                <div className="property_meta transparent">
                                                                    <span><i className="icon-select-an-objecto-tool"></i>4800 sq ft</span>
                                                                    <span><i className="icon-bed"></i>2 Office Rooms</span>
                                                                    <span><i className="icon-safety-shower"></i>1 Bathroom</span>
                                                                </div>
                                                                <div className="property_meta transparent bottom30">
                                                                    <span><i className="icon-old-television"></i>TV Lounge</span>
                                                                    <span><i className="icon-garage"></i>1 Garage</span>
                                                                    <span></span>
                                                                </div>
                                                                <div className="favroute clearfix">
                                                                    <p className="pull-md-left"><i className="icon-calendar2"></i>&nbsp;5 Days ago </p>
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
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div className="property_item heading_space">
                                                            <div className="image">
                                                                <a href="#."><img src="images/listing1.jpg" alt="latest property" className="img-responsive"/></a>
                                                                <div className="price clearfix">
                                                                    <span className="tag pull-right">$8,600 Per Month</span>
                                                                </div>
                                                                <span className="tag_t">For Sale</span>
                                                                <span className="tag_l">Featured</span>
                                                            </div>
                                                            <div className="proerty_content">
                                                                <div className="proerty_text">
                                                                    <h3 className="captlize"><a href="#.">Historic Town House</a></h3>
                                                                    <p>45 Regent Street, London, UK</p>
                                                                </div>
                                                                <div className="property_meta transparent">
                                                                    <span><i className="icon-select-an-objecto-tool"></i>4800 sq ft</span>
                                                                    <span><i className="icon-bed"></i>2 Office Rooms</span>
                                                                    <span><i className="icon-safety-shower"></i>1 Bathroom</span>
                                                                </div>
                                                                <div className="property_meta transparent bottom30">
                                                                    <span><i className="icon-old-television"></i>TV Lounge</span>
                                                                    <span><i className="icon-garage"></i>1 Garage</span>
                                                                    <span></span>
                                                                </div>
                                                                <div className="favroute clearfix">
                                                                    <p className="pull-md-left"><i className="icon-calendar2"></i>&nbsp;5 Days ago </p>
                                                                    <ul className="pull-right">
                                                                        <li><a href="#."><i className="icon-like"></i></a></li>
                                                                        <li><a href="#some" className="share_expender" data-toggle="collapse"><i className="icon-share3"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="toggle_share collapse" id="some">
                                                                    <ul>
                                                                        <li><a href="#." className="facebook"><i className="icon-facebook-1"></i> Facebook</a></li>
                                                                        <li><a href="#." className="twitter"><i className="icon-twitter-1"></i> Twitter</a></li>
                                                                        <li><a href="#." className="vimo"><i className="icon-vimeo3"></i> Vimeo</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <div className="property_item heading_space">
                                                            <div className="image">
                                                                <a href="#."><img src="images/listing1.jpg" alt="latest property" className="img-responsive"/></a>
                                                                <div className="price clearfix">
                                                                    <span className="tag pull-right">$8,600 Per Month</span>
                                                                </div>
                                                                <span className="tag_t">For Sale</span>
                                                                <span className="tag_l">Featured</span>
                                                            </div>
                                                            <div className="proerty_content">
                                                                <div className="proerty_text">
                                                                    <h3 className="captlize"><a href="#.">Historic Town House</a></h3>
                                                                    <p>45 Regent Street, London, UK</p>
                                                                </div>
                                                                <div className="property_meta transparent">
                                                                    <span><i className="icon-select-an-objecto-tool"></i>4800 sq ft</span>
                                                                    <span><i className="icon-bed"></i>2 Office Rooms</span>
                                                                    <span><i className="icon-safety-shower"></i>1 Bathroom</span>
                                                                </div>
                                                                <div className="property_meta transparent bottom30">
                                                                    <span><i className="icon-old-television"></i>TV Lounge</span>
                                                                    <span><i className="icon-garage"></i>1 Garage</span>
                                                                    <span></span>
                                                                </div>
                                                                <div className="favroute clearfix">
                                                                    <p className="pull-md-left"><i className="icon-calendar2"></i>&nbsp;5 Days ago </p>
                                                                    <ul className="pull-right">
                                                                        <li><a href="#."><i className="icon-like"></i></a></li>
                                                                        <li><a href="#three" className="share_expender" data-toggle="collapse"><i className="icon-share3"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="toggle_share collapse" id="three">
                                                                    <ul>
                                                                        <li><a href="#." className="facebook"><i className="icon-facebook-1"></i> Facebook</a></li>
                                                                        <li><a href="#." className="twitter"><i className="icon-twitter-1"></i> Twitter</a></li>
                                                                        <li><a href="#." className="vimo"><i className="icon-vimeo3"></i> Vimeo</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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