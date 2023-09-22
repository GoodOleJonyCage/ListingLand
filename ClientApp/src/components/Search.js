import { useState, useEffect } from 'react'
import { GetSearchVM, GetSearchResults } from '../Services/Services'
import { LocationLocator } from './LocationLocator'

export const Search = (props) => {

    const [vm, setvm] = useState({});
    const [error, seterror] = useState('');

    const loadData = async () => {

        const vm = await GetSearchVM();
        setvm(vm);
        
    }

    useEffect(() => {
        loadData();
    }, []);

    return <>
        {
            vm.location !== undefined ?
            <aside className="col-md-4 col-xs-12">
                <div className="property-query-area clearfix">
                    <div className="col-md-12">
                        <h3 className="text-uppercase bottom20 top15">Advanced Search</h3>
                    </div>
                    <div className="callus">
                        <div className="single-query form-group col-sm-12">
                            <input
                                onChange={(e) => {
                                    vm.name = e.target.value;
                                }}
                                type="text" className="keyword-input" placeholder="Keyword (e.g. 'office')" />
                        </div>
                        <div className="form-group col-sm-12">
                            <div className="intro">
                                    <LocationLocator location={vm.location}></LocationLocator>
                            </div>
                        </div>
                        <div className="single-query form-group col-sm-12">
                            <div className="intro">
                                <select id="sel-officerooms"  >
                                    <option value="-1" className="active">Min Office Rooms</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>
                        </div>
                        <div className="single-query form-group col-sm-12">
                            <div className="intro">
                                <select id="sel-garages">
                                    <option value="-1" className="active">Min Garages</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>
                        </div>
                        <div className="search-2 col-sm-12">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="single-query form-group">
                                        <div className="intro">
                                            <select id="sel-beds" >
                                                <option value="-1" className="active">Min Beds</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-query form-group">
                                        <div className="intro">
                                            <select id="sel-baths">
                                                <option value="-1" className="active">Min Baths</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="single-query form-group">
                                        <input
                                            onChange={(e) => {
                                                vm.areaFrom = e.target.value;
                                            }}
                                            type="text" className="keyword-input" placeholder="Min Area (sq ft)" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-query form-group">
                                        <input
                                            onChange={(e) => {
                                                vm.areaTo = e.target.value;
                                            }}
                                            type="text" className="keyword-input" placeholder="Max Area (sq ft)" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="single-query form-group">
                                        <div className="intro">
                                            <select id="sel-frontyard" >
                                                <option value="-1" className="active">Front Yard</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-query form-group">
                                        <div className="intro">
                                            <select id="sel-backyard" >
                                                <option value="-1" className="active">Back Yard</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 bottom30">
                            <div className="single-query-slider">
                                <label><strong>Price Range:</strong></label>
                                <div className="price text-right price-container">
                                    <span>$</span>
                                    <div className="leftLabel" id="leftLabel"></div>
                                    <span>to $</span>
                                    <div className="rightLabel" id="rightLabel"></div>
                                </div>
                                <div data-range_min="0" data-range_max="1500000" data-cur_min="0" data-cur_max="1500000" className="nstSlider">
                                    <div className="bar"></div>
                                    <div className="leftGrip"></div>
                                    <div className="rightGrip"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 form-group highlight-error ">
                            {error}
                        </div>
                        <div className="col-sm-12 form-group">
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    vm.priceFrom = document.getElementById('leftLabel').innerHTML;
                                    vm.priceTo = document.getElementById('rightLabel').innerHTML;
                                    vm.frontYard = document.getElementById('sel-frontyard').value;
                                    vm.backYard = document.getElementById('sel-backyard').value;

                                    vm.minOfficeRooms = document.getElementById('sel-officerooms').value;
                                    vm.minGarages = document.getElementById('sel-garages').value;
                                    vm.minBedrooms = document.getElementById('sel-beds').value;
                                    vm.minBaths = document.getElementById('sel-baths').value;
                                    try {
                                        seterror('');
                                        props.setloading(true);
                                        const listings = await GetSearchResults(vm);
                                        props.setloading(false);
                                        props.setlistings(listings);
                                    } catch (e) {
                                        props.setloading(false);
                                        e.json().then(error => { seterror(error); });
                                    }

                                }}
                                className="btn-blue border_radius">Search</button>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="group-button-search">
                            <a data-toggle="collapse" href=".search-propertie-filters" className="more-filter bottom15">
                                <i className="fa fa-plus text-1" aria-hidden="true"></i><i className="fa fa-minus text-2 hide" aria-hidden="true"></i>
                                <div className="text-1">Show more search options</div>
                                <div className="text-2 hide">less more search options</div>
                            </a>
                        </div>
                    </div>
                    <div className="search-propertie-filters collapse">
                        <div className="container-2">
                            <div className="row">
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                    <div className="search-form-group white">
                                        <input type="checkbox" name="check-box" />
                                        <span>Rap music</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="bottom40 margin40">Featured Properties</h3>
                    </div>
                </div>
                <div className="row bottom20">
                    <div className="col-md-4 col-sm-4 col-xs-6 p-image">
                        <img src="images/f-p-1.png" alt="image" />
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-6">
                        <div className="feature-p-text">
                            <h4>Historic Town House</h4>
                            <p className="bottom15">45 Regent Street, London, UK</p>
                            <a href="#.">$128,600</a>
                        </div>
                    </div>
                </div>
                <div className="row bottom20">
                    <div className="col-md-4 col-sm-4 col-xs-6 p-image">
                        <img src="images/f-p-1.png" alt="image" />
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-6">
                        <div className="feature-p-text">
                            <h4>Historic Town House</h4>
                            <p className="bottom15">45 Regent Street, London, UK</p>
                            <a href="#.">$128,600</a>
                        </div>
                    </div>
                </div>
                <div className="row bottom20">
                    <div className="col-md-4 col-sm-4 col-xs-6 p-image">
                        <img src="images/f-p-1.png" alt="image" />
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-6">
                        <div className="feature-p-text">
                            <h4>Historic Town House</h4>
                            <p className="bottom15">45 Regent Street, London, UK</p>
                            <a href="#.">$128,600</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="margin40 bottom20">Featured Properties</h3>
                    </div>
                    <div className="col-md-12">
                        <div id="agent-2-slider" className="owl-carousel">
                            <div className="item">
                                <div className="property_item heading_space">
                                    <div className="image">
                                        <a href="#"><img src="images/slider-list2.jpg" alt="listin" className="img-responsive" /></a>
                                        <div className="feature"><span className="tag-2">For Rent</span></div>
                                        <div className="price clearfix"><span className="tag pull-right">$8,600 Per Month - <small>Family Home</small></span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="property_item heading_space">
                                    <div className="image">
                                        <a href="#"><img src="images/slider-list2.jpg" alt="listin" className="img-responsive" /></a>
                                        <div className="feature"><span className="tag-2">For Rent</span></div>
                                        <div className="price clearfix"><span className="tag pull-right">$8,600 Per Month - <small>Family Home</small></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside> : <></>
        }
    </>
}