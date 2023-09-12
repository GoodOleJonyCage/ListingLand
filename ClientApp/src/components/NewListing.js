import { useState, useEffect } from 'react'
import { GetNewListing, CreateListing } from '../Services/Services'

export const NewListing = () => {

    const [vm, setvm] = useState({});
    const [tab, settab] = useState(2);

    const loadData = async () => {

        const newvm = await GetNewListing();
        setvm(newvm);
        console.log(newvm);

    }

    useEffect(() => {
        loadData();
    }, []);

    return <>
        <section id="property" className="padding listing1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <ul className="f-p-links margin_bottom">
                            <li>
                                <a onClick={(e) => { e.preventDefault(); settab(0) }}
                                    href="profile.html" className={tab === 0 ? "active" : ""}>
                                    <i className="icon-icons215"></i>
                                    Profile
                                </a>
                            </li>
                            <li><a onClick={(e) => { e.preventDefault(); settab(1) }}
                                href="my_properties.html"
                                className={tab === 1 ? "active" : ""}>
                                <i className="icon-icons215"></i>
                                My Properties
                            </a>
                            </li>
                            <li>
                                <a onClick={(e) => { e.preventDefault(); settab(2) }}
                                    href="submit_property.html"
                                    className={tab === 2 ? "active" : ""}>
                                    <i className="icon-icons215"></i>
                                    Submit Property
                                </a>
                            </li>
                            <li>
                                <a onClick={(e) => { e.preventDefault(); settab(3) }}
                                    href="favorite_properties.html"
                                    className={tab === 3 ? "active" : ""} >
                                    <i className="icon-icons215"></i>
                                    Favorite Properties
                                </a>
                            </li>
                            {/*<li>*/}
                            {/*    <a onClick={(e) => { e.preventDefault(); settab(4) }}*/}
                            {/*        href="login.html"*/}
                            {/*        className={tab === 4 ? "active" : ""} >*/}
                            {/*        <i className="icon-icons215"></i>*/}
                            {/*        Logout*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
                <div className={tab === 0 ? "row show" : "row hide"}>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-10 col-md-8">
                        Content1
                    </div>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div className={tab === 1 ? "row show" : "row hide"}>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-10 col-md-8">
                        Content2
                    </div>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div className={tab === 2 ? "row show" : "row hide" }>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-10 col-md-8">
                        <h2 className="text-uppercase bottom40">Add Your Property</h2>
                        <form className="callus clearfix border_radius submit_property">
                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="single-query form-group bottom20">
                                        <label>Title</label>
                                        <input type="text" className="keyword-input" placeholder="Enter your property title" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-query form-group bottom20">
                                        <label>Location</label>
                                        <input type="text" className="keyword-input" placeholder="Enter Proprty Location" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-query bottom20">
                                        <label>Status </label>
                                        <div className="intro">
                                            <select>
                                                <option className="active">For Sale</option>
                                                <option>For Sale</option>
                                                <option>For Sale </option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-query form-group bottom20">
                                        <label>Price</label>
                                        <input type="text" className="keyword-input" placeholder="23,000" />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="margin40 bottom15">Propertie Photos <i className="fa fa-info-circle help" data-toggle="tooltip" title="add images to upload for property!"></i></h3>
                                <div className="file_uploader bottom20">
                                    <form id="upload-widget" method="post" action="/upload" className="dropzone">
                                        <div className="dz-default dz-message">
                                            <span>
                                                <i className="fa fa-plus-circle"></i>
                                                Click here or drop files to upload
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="bottom15 margin40">Propertie Detail</h3>
                            </div>
                        </div>
                        <form className="callus clearfix border_radius submit_property">
                            <div className="row">

                                <div className="col-sm-4">

                                    <div className="single-query form-group bottom20">
                                        <label>Size Prefix</label>
                                        <div className="intro">
                                            <select>
                                                <option className="active">Sq Ft</option>
                                                <option>For Sale</option>
                                                <option>For Sale </option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="single-query form-group bottom20">
                                        <label>Bedrooms</label>
                                        <div className="intro">
                                            <select>
                                                <option className="active">Number of Bedrooms</option>
                                                <option>For Sale</option>
                                                <option>For Sale </option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <div className="single-query  form-group bottom20">
                                        <label>Bathrooms</label>
                                        <div className="intro">
                                            <select>
                                                <option className="active">Number of bathrooms</option>
                                                <option>For Sale</option>
                                                <option>For Sale </option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="single-query form-group bottom20">
                                        <label>TV Lounge</label>
                                        <div className="intro">
                                            <select>
                                                <option className="active">Number of TV Lounge</option>
                                                <option>For Sale</option>
                                                <option>For Sale </option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="single-query form-group  bottom20">
                                        <label>Garages</label>
                                        <div className="intro">
                                            <select>
                                                <option className="active">Number of Garages</option>
                                                <option>For Sale</option>
                                                <option>For Sale </option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="single-query form-group bottom20">
                                        <label>Swimming Pool</label>
                                        <div className="intro">
                                            <select>
                                                <option className="active">Number of Pool</option>
                                                <option>For Sale</option>
                                                <option>For Sale </option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <h3 className="bottom15 margin40">Propertie Description </h3>
                                    <textarea id="txtEditor"></textarea>
                                </div>
                                <div className="col-sm-12">
                                    <h3 className="bottom15 margin40">Quick Summary</h3>
                                    <div className="table-responsive summery_table">
                                        <table className="table">
                                            <tr>
                                                <td>
                                                    <i className="fa fa-bars titles"></i>
                                                </td>
                                                <td>
                                                    <div className="single-query form-group">
                                                        <label>Title</label>
                                                        <input type="text" className="keyword-input" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="single-query form-group">
                                                        <label>Value</label>
                                                        <input type="text" className="keyword-input" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#." className="close-t"><i className="fa fa-close"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <i className="fa fa-bars titles"></i>
                                                </td>
                                                <td>
                                                    <div className="single-query form-group">
                                                        <label>Title</label>
                                                        <input type="text" className="keyword-input" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="single-query form-group">
                                                        <label>Value</label>
                                                        <input type="text" className="keyword-input" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#." className="close-t"><i className="fa fa-close"></i></a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <i className="fa fa-bars titles"></i>
                                                </td>
                                                <td>
                                                    <div className="single-query form-group">
                                                        <label>Title</label>
                                                        <input type="text" className="keyword-input" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="single-query form-group">
                                                        <label>Value</label>
                                                        <input type="text" className="keyword-input" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#." className="close-t"><i className="fa fa-close"></i></a>
                                                </td>
                                            </tr>

                                        </table>
                                        <a href="#." className="add-new"><i className="fa fa-plus"></i> Add New</a>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <h3 className="bottom15 margin40">Property Features</h3>
                                    <div className="search-propertie-filters">
                                        <div className="container-2">
                                            <div className="row">
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Air Conditioning</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Balcony</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Gas Heat</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Fire Place</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Washer and Dryer</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Swimming Pool</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Laundry Room</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Home Theater</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Smoking allowed</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Cable TV</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-4">
                                                    <div className="search-form-group white">
                                                        <input type="checkbox" name="check-box" />
                                                        <span>Window Coverings</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <h3 className="bottom15 margin40">Video Presentation</h3>
                                    <div className="single-query form-group bottom15">
                                        <label>Vimeo or Youtube URL</label>
                                        <input type="text" className="keyword-input" placeholder="https://vimeo.com" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <h3 className="bottom15 margin40">Place on Map</h3>
                                    <div className="single-query form-group bottom15">
                                        <label>Property Address</label>
                                        <input type="text" className="keyword-input" placeholder="Enter a Location" />
                                    </div>
                                    <div id="single_map"></div>
                                </div>
                                <div className="col-md-4">
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await CreateListing(vm);
                                        }}
                                        type="submit" className="btn-blue border_radius margin40">submit property</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div className={tab === 3 ? "row show" : "row hide"}>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-10 col-md-8">
                        Content3
                    </div>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-4">
                    </div>
                </div>
                <div className={tab === 4 ? "row show" : "row hide"}>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-10 col-md-8">
                        Content4
                    </div>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-4">
                    </div>
                </div>
            </div>
        </section>
    </>
}