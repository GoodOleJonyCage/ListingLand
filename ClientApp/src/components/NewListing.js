import { useState, useEffect } from 'react'
import { GetNewListing, CreateListing, UploadFiles, GetUserInfo, GetListingsByUserID, GetListing, EditListing, DeleteListing } from '../Services/Services'
import { Loading } from './Loading'
import { LocationLocator } from './LocationLocator'
import { UserStore } from '../Store/UserStore'

export const NewListing = () => {

    const [vm, setvm] = useState(null);
    const [tab, settab] = useState(2);
    const [error, seterror] = useState('');

    const [listingCreated, setlistingCreated] = useState(false);
    const [uploadpic, setuploadpic] = useState(false);

    
    const loadData = async () => {

        const newvm = await GetNewListing();
        setvm(newvm);
        //console.log(newvm);
       
    }

    useEffect(() => {
        loadData();
    }, []);

    const UploadPic = (props) => {

      
        const [image, setImage] = useState('/images/no-image-available.jpeg');
        const [image2, setImage2] = useState('/images/no-image-available.jpeg');
        const [image3, setImage3] = useState('/images/no-image-available.jpeg');

        const [imgerror, setimgerror] = useState('');

        const submitForm = async (event) => {

            event.preventDefault();

            const dataArray = new FormData();

            const filedata = document.getElementById("files").files[0];
            const filedata2 = document.getElementById("files2").files[0];
            const filedata3 = document.getElementById("files3").files[0];

            dataArray.append("lsitingid", props.listingID);
            //if (filedata && filedata.length > 0 )
                dataArray.append("files", filedata);
            //if (filedata2 && filedata2.length > 0)
                dataArray.append("files", filedata2);
            //if (filedata3 && filedata3.length > 0)
                dataArray.append("files", filedata3);

            try {
                setimgerror('');
                await UploadFiles(dataArray);
                setlistingCreated(true);
                setuploadpic(false);
            } catch (e) {

                e.text().then(error => {
                    //console.log(error);
                    setimgerror(error);
                })
            }
        };

        const onImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                setImage(URL.createObjectURL(event.target.files[0]));
            }
        }
        const onImageChange2 = (event) => {
            if (event.target.files && event.target.files[0]) {
                setImage2(URL.createObjectURL(event.target.files[0]));
            }
        }
        const onImageChange3 = (event) => {
            if (event.target.files && event.target.files[0]) {
                setImage3(URL.createObjectURL(event.target.files[0]));
            }
        }
        useEffect(() => {
            //if (props.profilePic && props.profilePic.length > 0)
            //    setImage(props.profilePic);
        }, []);


        return <>
            <div className="row">
                <div className="col-sm-12">
                    <form className="form-group upload-container" onSubmit={submitForm} encType="multipart/form-data">

                        <div className="uploader-button-container">
                            <input type="file" id="files" name="files"
                                onChange={onImageChange} className="btn-blue border_radius margin40 filetype file-uploader" />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImage(null);
                                    document.getElementById("files").value = null
                                }}
                                className="btn-yellow border_radius margin40" >Clear Image <i className="icofont-paper-plane"></i></button>
                            
                        </div>
                        <div className="img-container">
                            <img alt="" src={image} />
                        </div>

                        <div className="uploader-button-container">
                            <input type="file" id="files2" name="files2"
                                onChange={onImageChange2} className="btn-blue border_radius margin40 filetype file-uploader" />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImage2(null);
                                    document.getElementById("files2").value = null
                                }}
                                className="btn-yellow border_radius margin40" >Clear Image <i className="icofont-paper-plane"></i></button>
                        </div>
                        <div className="img-container">
                            <img alt="" src={image2} />
                        </div>

                         
                        <div className="uploader-button-container">
                                <input type="file" id="files3" name="files3"
                                    onChange={onImageChange3} className="btn-blue border_radius margin40 filetype file-uploader" />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImage3(null);
                                        document.getElementById("files3").value = null
                                    }}
                                    className="btn-yellow border_radius margin40" >Clear Image <i className="icofont-paper-plane"></i></button>
                            </div>
                        <div className="img-container">
                            <img alt="" src={image3} />
                        </div>

                        <div className="highlight-error margin40">{imgerror}</div>
                        <div className="">
                            <button className="btn-blue border_radius margin40 upload-btn " type="submit" >Upload<i className="icofont-paper-plane"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    }

    const CreateAnother = () => {

        return <>
            <div className="row listing-created-container">
                <div className="text-success listing-created-successlabel">Listing Created</div>
                <div className="listing-createdbutton-container">
                    <div><button
                        onClick={(e) => { setlistingCreated(false); }}
                        className="btn-blue border_radius margin40">Create Another?</button></div>
                    <div><button
                        onClick={(e) => { setlistingCreated(false); }}
                        className="btn-blue border_radius margin40">Cancel</button></div>
                </div>
            </div>
        </>
    }

    const CreateListingForm = () => {

        const { getUsername } = UserStore();

        return <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="search-propertie-filters">
                        <div className="container-2">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Name</label>
                                        <div className="text-danger">{vm.nameError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <input
                                            onChange={(e) => {
                                                vm.name = e.target.value;
                                            }}
                                            type="textbox" className="listing-txt-name" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Price</label>
                                        <div className="text-danger">{vm.priceError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group newlisting-container white">
                                        <input
                                            onChange={(e) => {
                                                vm.price = e.target.value;
                                            }}
                                            type="textbox" className="listing-txt-name" />$
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Area</label>
                                        <div className="text-danger">{vm.areaError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group newlisting-container white">
                                        <input
                                            onChange={(e) => {
                                                vm.area = e.target.value;
                                            }}
                                            type="textbox" className="listing-txt-name" />Sqaure Feet
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Bedrooms</label>
                                        <div className="text-danger">{vm.bedroomsError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <input
                                            onChange={(e) => {
                                                vm.bedrooms = e.target.value;
                                            }}
                                            type="textbox" className="listing-txt-name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Bathrooms</label>
                                        <div className="text-danger">{vm.bathroomsError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <input
                                            onChange={(e) => {
                                                vm.bathrooms = e.target.value;
                                            }}
                                            type="textbox" className="listing-txt-name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Office Rooms</label>
                                        <div className="text-danger">{vm.officeRoomsError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <input
                                            onChange={(e) => {
                                                vm.officeRooms = e.target.value;
                                            }}
                                            type="textbox" className="listing-txt-name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Garages</label>
                                        <div className="text-danger">{vm.garagesError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <input
                                            onChange={(e) => {
                                                vm.garages = e.target.value;
                                            }}
                                            type="textbox" className="listing-txt-name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Backyard</label>
                                        <div className="text-danger">{vm.backyardError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <select
                                            defaultValue={vm.backyard}
                                            onChange={(e) => {
                                                vm.backyard = e.target.value === "1" ? true : false;
                                            }}>
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Frontyard</label>
                                        <div className="text-danger">{vm.frontyardError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <select
                                            defaultValue={vm.frontyard}
                                            onChange={(e) => {
                                                vm.frontyard = e.target.value === "1" ? true : false;
                                            }}>
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <label>Location</label>
                                        <div className="text-danger">{vm.locationError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="search-form-group white">
                                        <LocationLocator location={vm.location}></LocationLocator>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Descriptions*/}
                <div className="col-sm-12 listing-textarea-container">
                    {
                        vm.description.map((attribute, index) => {
                            return <div key={index}>
                                <h3 className="bottom15 margin40">{attribute.attributename}</h3>
                                <textarea id={"textarea" + index}
                                    defaultValue={attribute.textValue}
                                    onChange={(e) => {
                                        attribute.textValue = e.target.value;
                                    }}
                                ></textarea>
                                <span className="text-danger">{attribute.errorMessage}</span>
                            </div>
                        })
                    }
                </div>
                {/*Descriptions*/}

                {/*Features*/}
                <div className="col-sm-12">
                    <h3 className="bottom15 margin40">{vm.features[0].sectionName}</h3>
                    <div className="search-propertie-filters">
                        <div className="container-2">
                            <div className="row">
                                {
                                    vm.features.map((attribute, index) => {
                                        return <div key={index} className="col-md-4 col-sm-4">
                                            <div className="listing-checkbox-container white">
                                                <input
                                                    defaultChecked={attribute.selected}
                                                    onChange={(e) => {
                                                        attribute.selected = e.target.checked;
                                                    }}
                                                    type="checkbox" name="check-box" />
                                                <span>{attribute.attributename}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="row">
                                <span className="text-danger">{vm.featureError}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Features*/}

                {/*Summary*/}
                <div className="col-sm-12">
                    <h3 className="bottom15 margin40">{vm.quickSummary[0].sectionName}</h3>
                    <div className="search-propertie-filters">
                        <div className="container-2">
                            {
                                vm.quickSummary.map((attribute, index) => {
                                    return <div className="row" key={index}>
                                        {
                                            attribute.attributeType === "CheckBox" ?
                                                <div key={index} className="">
                                                    {
                                                        attribute.attributeValues.length > 0 ?
                                                            <div className="listing-av-container">
                                                                <div className="listing-av-checkbox-container-heading">{attribute.attributename}</div>
                                                                <div className="listing-av-checkbox-container">
                                                                    {
                                                                        attribute.attributeValues.map((av, i) => {
                                                                            return <div key={i} className="listing-av-item white">
                                                                                <span>{av.value}</span>
                                                                                <input
                                                                                    defaultChecked={av.selected}
                                                                                    onChange={(e) => {
                                                                                        av.selected = e.target.checked;
                                                                                    }}
                                                                                    type="checkbox" name="check-box" />
                                                                            </div>
                                                                        })}
                                                                </div>
                                                                <span className="text-danger">{attribute.errorMessage}</span>
                                                            </div>
                                                            :
                                                            <div className="listing-checkbox-container white">
                                                                <span>{attribute.attributename}</span>
                                                                <input
                                                                    defaultChecked={attribute.selected}
                                                                    onChange={(e) => {
                                                                        attribute.selected = e.target.checked;
                                                                    }}
                                                                    type="checkbox" name="check-box" />
                                                                <span className="text-danger">{attribute.errorMessage}</span>
                                                            </div>
                                                    }
                                                </div> :
                                                <div key={index} className="">
                                                    <div className="listing-textbox-container white">
                                                        <span>{attribute.attributename}</span>
                                                        <input type="text"
                                                            defaultValue={attribute.textValue}
                                                            onChange={(e) => {
                                                                attribute.textValue = e.target.value;
                                                            }} />
                                                        <span className="text-danger">{attribute.errorMessage}</span>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                {/*Summary*/}
                <div className="text-danger row">{error}</div>
                <div className="col-md-4">
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            try {
                                vm.postedBy = getUsername();
                                const newvm = await CreateListing(vm)
                                setvm(newvm);
                                if (newvm.isValid) {

                                    setuploadpic(true);
                                }
                            } catch (e) {
                                e.json().then(error => {
                                    seterror(error);
                                })
                            }
                        }}
                        type="submit" className="btn-blue border_radius margin40">submit property</button>
                </div>
            </div>
        </>
    }

    const Profile = () => {


        const [user, setuser] = useState(null);
        const {getUsername } = UserStore();

        const loadData = async () => {
            const newvm = await GetUserInfo(getUsername());
            setuser(newvm);
            //console.log(newvm);
        }

        useEffect(() => {
            loadData();
        }, []);

        return <>
            {
                user === null ? <Loading></Loading> :
                    <section id="agent-2-peperty" className="profile padding">
                        <div className="container-3">
                            <div className="row">
                                <div className="col-md-4 col-sm-6 col-xs-12">
                                    <h2 className="text-uppercase bottom30">my profile</h2>
                                    <div className="agent-p-img">
                                        <img src={user.image} className="img-responsive" alt="image" />
                                        <a href="#" className="top10 bottom20">Update Profile Picture</a>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="profile-form">
                                        <div className="row">
                                            <form className="callus">
                                                <div className="col-sm-4">
                                                    <div className="single-query">
                                                        <label>Your Name:</label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="single-query form-group">
                                                        <input defaultValue={user.name } type="text" placeholder="Bohdan Kononets" className="keyword-input" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="single-query">
                                                        <label>Phone:</label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="single-query form-group">
                                                        <input defaultValue={user.telephone} type="text" placeholder="(+01) 34 56 7890" className="keyword-input" />
                                                    </div>
                                                </div>
                                                
                                                <div className="col-sm-4">
                                                    <div className="single-query">
                                                        <label>Email Adress:</label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="single-query form-group">
                                                        <input defaultValue={user.emailAddress} type="text" placeholder="bohdan@realtyhomes.com" className="keyword-input" />
                                                    </div>
                                                </div>
                                                
                                                <div className="col-sm-4">
                                                    <div className="single-query">
                                                        <label>About:</label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="single-query form-group">
                                                        <textarea defaultValue={user.about}  placeholder="Write here somthing about yours" className="form-control"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 col-sm-12 col-xs-12 text-right">
                                                    <a className="btn-blue border_radius" href="#.">Save Changes</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         
                    </section>
            }
        </>

    }

    const PropertyTab = () => {

        const [editlistingid, seteditlistingid] = useState(-1);
        const {getUsername} = UserStore();

        const PropertyList = () => {

            const [listings, setlistings] = useState([]);

            const loadData = async () => {

                const vm = await GetListingsByUserID(getUsername());
                setlistings(vm);
                //console.log(vm);
            }

            useEffect(() => {
                loadData();
                //console.log('PropertyList');
            }, []);

            return <>
                <section id="agent-2-peperty" className="my-pro padding">
                    <div className=" list-t-border">
                        {
                            listings.map((listing, index) => {
                                return <div key={index} className="row bg-hover">
                                    <div className="my-pro-list">
                                        <div className="col-md-2 col-sm-2 col-xs-12">
                                            <img src={
                                                listing.images.length > 0 ? listing.images[0].imageSrc : "images/no-image-available.jpeg"} alt="image" />
                                        </div>
                                        <div className="col-md-8 col-sm-8 col-xs-12">
                                            <div className="feature-p-text">
                                                <h4>{listing.name }</h4>
                                                <p>{listing.location.city.name},{listing.location.region.name} {listing.location.country.name}</p>
                                                <span><b>Status:</b>  For Sale</span><br />
                                                <div className="button-my-pro-list">
                                                    <a href="#.">${listing.price}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-xs-12">
                                            <div className="select-pro-list">
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        seteditlistingid(listing.listingID);
                                                    }}
                                                    href="#"><i className="icon-pen2"></i></a>
                                                <a
                                                    onClick={async  (e) => {
                                                        e.preventDefault();
                                                        if (window.confirm("Delete this listing?")) {
                                                            //delete this entry
                                                            await DeleteListing(listing.listingID);
                                                            loadData();
                                                        }
                                                    }}
                                                    href="#"><i className="icon-cross"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="container">
                        <div className="row padding_top">
                            <div className="col-md-12">
                                <ul className="pager">
                                    <li><a href="#">1</a></li>
                                    <li className="active"><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        }
        const EditProperty = () => {

            const [editlisting, seteditlisting] = useState(null);
            const [editlistingerror, seteditlistingerror] = useState('');

            const loadData = async () => {
                if (editlistingid > -1) {
                    const listingtoedit = await GetListing(editlistingid);
                    seteditlisting(listingtoedit);
                    //console.log(listingtoedit);
                }
                else {
                    seteditlisting(null);
                }
            }

            useEffect(() => {
                loadData();
            }, []);

            return <>
                {
                    editlisting === null ? <></> :
                        <div className="row">
                            <div className="col-sm-12">
                                {
                                    editlisting.images.map((image, i) => {
                                        return <div className="item main-image-container" key={i}>
                                            <a data-fancybox="images" data-type="image" data-src="#">
                                                <img src={image.imageSrc} alt="image"></img>
                                            </a>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="col-sm-12">
                                <div className="search-propertie-filters">
                                    <div className="container-2">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Name</label>
                                                    <div className="text-danger">{editlisting.nameError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <input
                                                        defaultValue={editlisting.name}
                                                        onChange={(e) => {
                                                            editlisting.name = e.target.value;
                                                        }}
                                                        type="textbox" className="listing-txt-name" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Price</label>
                                                    <div className="text-danger">{editlisting.priceError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group newlisting-container white">
                                                    <input
                                                        defaultValue={editlisting.price}
                                                        onChange={(e) => {
                                                            editlisting.price = e.target.value;
                                                        }}
                                                        type="textbox" className="listing-txt-name" />$
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Area</label>
                                                    <div className="text-danger">{editlisting.areaError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group newlisting-container white">
                                                    <input
                                                        defaultValue={editlisting.area}
                                                        onChange={(e) => {
                                                            editlisting.area = e.target.value;
                                                        }}
                                                        type="textbox" className="listing-txt-name" />Sqaure Feet
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Bedrooms</label>
                                                    <div className="text-danger">{editlisting.bedroomsError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <input
                                                        defaultValue={editlisting.bedrooms}
                                                        onChange={(e) => {
                                                            editlisting.bedrooms = e.target.value;
                                                        }}
                                                        type="textbox" className="listing-txt-name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Bathrooms</label>
                                                    <div className="text-danger">{editlisting.bathroomsError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <input
                                                        defaultValue={editlisting.bathrooms}
                                                        onChange={(e) => {
                                                            editlisting.bathrooms = e.target.value;
                                                        }}
                                                        type="textbox" className="listing-txt-name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Office Rooms</label>
                                                    <div className="text-danger">{editlisting.officeRoomsError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <input
                                                        defaultValue={editlisting.officeRooms}
                                                        onChange={(e) => {
                                                            editlisting.officeRooms = e.target.value;
                                                        }}
                                                        type="textbox" className="listing-txt-name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Garages</label>
                                                    <div className="text-danger">{editlisting.garagesError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <input
                                                        defaultValue={editlisting.garages}
                                                        onChange={(e) => {
                                                            editlisting.garages = e.target.value;
                                                        }}
                                                        type="textbox" className="listing-txt-name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Backyard</label>
                                                    <div className="text-danger">{editlisting.backyardError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <select
                                                        defaultValue={editlisting.backyard ?"1":"0"}
                                                        onChange={(e) => {
                                                            editlisting.backyard = e.target.value === "1" ? true : false;
                                                        }}>
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Frontyard</label>
                                                    <div className="text-danger">{editlisting.frontyardError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <select
                                                        defaultValue={editlisting.frontyard ? "1" : "0"}
                                                        onChange={(e) => {
                                                            editlisting.frontyard = e.target.value === "1" ? true : false;
                                                        }}>
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <label>Location</label>
                                                    <div className="text-danger">{editlisting.locationError}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="search-form-group white">
                                                    <LocationLocator location={editlisting.location}></LocationLocator>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Descriptions*/}
                            <div className="col-sm-12 listing-textarea-container">
                                {
                                    editlisting.description.map((attribute, index) => {
                                        return <div key={index}>
                                            <h3 className="bottom15 margin40">{attribute.attributename}</h3>
                                            <textarea id={"textarea" + index}
                                                defaultValue={attribute.textValue}
                                                onChange={(e) => {
                                                    attribute.textValue = e.target.value;
                                                }}
                                            ></textarea>
                                            <span className="text-danger">{attribute.errorMessage}</span>
                                        </div>
                                    })
                                }
                            </div>
                            {/*Descriptions*/}

                            {/*Features*/}
                            <div className="col-sm-12">
                                <h3 className="bottom15 margin40">{editlisting.features[0].sectionName}</h3>
                                <div className="search-propertie-filters">
                                    <div className="container-2">
                                        <div className="row">
                                            {
                                                editlisting.features.map((attribute, index) => {
                                                    return <div key={index} className="col-md-4 col-sm-4">
                                                        <div className="listing-checkbox-container white">
                                                            <input
                                                                defaultChecked={attribute.selected}
                                                                onChange={(e) => {
                                                                    attribute.selected = e.target.checked;
                                                                }}
                                                                type="checkbox" name="check-box" />
                                                            <span>{attribute.attributename}</span>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="row">
                                            <span className="text-danger">{editlisting.featureError}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Features*/}

                            {/*Summary*/}
                            <div className="col-sm-12">
                                <h3 className="bottom15 margin40">{editlisting.quickSummary[0].sectionName}</h3>
                                <div className="search-propertie-filters">
                                    <div className="container-2">
                                        {
                                            editlisting.quickSummary.map((attribute, index) => {
                                                return <div className="row" key={index}>
                                                    {
                                                        attribute.attributeType === "CheckBox" ?
                                                            <div key={index} className="">
                                                                {
                                                                    attribute.attributeValues.length > 0 ?
                                                                        <div className="listing-av-container">
                                                                            <div className="listing-av-checkbox-container-heading">{attribute.attributename}</div>
                                                                            <div className="listing-av-checkbox-container">
                                                                                {
                                                                                    attribute.attributeValues.map((av, i) => {
                                                                                        return <div key={i} className="listing-av-item white">
                                                                                            <span>{av.value}</span>
                                                                                            <input
                                                                                                defaultChecked={av.selected}
                                                                                                onChange={(e) => {
                                                                                                    av.selected = e.target.checked;
                                                                                                }}
                                                                                                type="checkbox" name="check-box" />
                                                                                        </div>
                                                                                    })}
                                                                            </div>
                                                                            <span className="text-danger">{attribute.errorMessage}</span>
                                                                        </div>
                                                                        :
                                                                        <div className="listing-checkbox-container white">
                                                                            <span>{attribute.attributename}</span>
                                                                            <input
                                                                                defaultChecked={attribute.selected}
                                                                                onChange={(e) => {
                                                                                    attribute.selected = e.target.checked;
                                                                                }}
                                                                                type="checkbox" name="check-box" />
                                                                            <span className="text-danger">{attribute.errorMessage}</span>
                                                                        </div>
                                                                }
                                                            </div> :
                                                            <div key={index} className="">
                                                                <div className="listing-textbox-container white">
                                                                    <span>{attribute.attributename}</span>
                                                                    <input type="text"
                                                                        defaultValue={attribute.textValue}
                                                                        onChange={(e) => {
                                                                            attribute.textValue = e.target.value;
                                                                        }} />
                                                                    <span className="text-danger">{attribute.errorMessage}</span>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            {/*Summary*/}
                            <div className="text-danger row">{editlistingerror}</div>
                            <div className="col-md-6 listing-createdbutton-container">
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        try {
                                            const newvm = await EditListing(editlisting);
                                            seteditlisting(newvm);
                                            if (newvm.isValid) {
                                                seteditlistingid(-1);
                                            }
                                        } catch (errorresponse) {
                                            errorresponse.json().then(error => {
                                                seteditlistingerror(error);
                                            })
                                        }
                                    }}
                                    type="submit" className="btn-blue border_radius margin40">Save Changes</button>
                                <button className="btn-blue border_radius margin40"
                                    onClick={(e) => { seteditlistingid(-1) }}>Cancel</button>
                            </div>
                        </div>
                }
            </>
        }

        return editlistingid === -1 ? <PropertyList /> : <EditProperty />
    }

    return <> {
        vm == null ? <Loading /> :
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
                           <Profile></Profile>
                        </div>
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                    <div className={tab === 1 ? "row show" : "row hide"}>
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-10 col-md-8">
                            <PropertyTab></PropertyTab>
                        </div>
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                    <div className={tab === 2 ? "row show" : "row hide"}>
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-10 col-md-8">
                            <h2 className="text-uppercase bottom40">Add Your Property</h2>
                            <div className="callus clearfix border_radius submit_property">
                                {
                                    listingCreated ?
                                        <CreateAnother/> :
                                        (
                                            uploadpic ? <UploadPic listingID={vm.listingID}></UploadPic> :
                                            <CreateListingForm></CreateListingForm>
                                        )
                                }
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                </div>
            </section>
    }
    </>
}