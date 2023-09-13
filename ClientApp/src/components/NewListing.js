import { useState, useEffect } from 'react'
import { GetNewListing, CreateListing } from '../Services/Services'
import { Loading } from './Loading'
import { LocationLocator } from './LocationLocator'

export const NewListing = () => {

    const [vm, setvm] = useState(null);
    const [tab, settab] = useState(2);
    const [error, seterror] = useState('');

    const loadData = async () => {

        const newvm = await GetNewListing();
        setvm(newvm);
        console.log(newvm);

    }

    useEffect(() => {
        loadData();
    }, []);

    return <> {
        vm == null ? <Loading/> :
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
                    <div className={tab === 2 ? "row show" : "row hide"}>
                        <div className="col-sm-1 col-md-2"></div>
                        <div className="col-sm-10 col-md-8">
                            <h2 className="text-uppercase bottom40">Add Your Property</h2>
                           
                            <form className="callus clearfix border_radius submit_property">
                                <div className="row">
                                     <div className="col-sm-12">
                                        <h3 className="bottom15 margin40">Property Location</h3>
                                        <div className="search-propertie-filters">
                                            <div className="container-2">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="search-form-group white">
                                                            <span>Name</span>
                                                            <div className="text-danger">{vm.nameError}</div> 
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="search-form-group white">
                                                            <input
                                                                onChange={(e) => {
                                                                      vm.name =  e.target.value;
                                                                }}       
                                                                type="textbox" className="listing-txt-name" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="search-form-group white">
                                                            <span>Location</span>
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
                                                return <>
                                                    <h3 className="bottom15 margin40">{attribute.attributename}</h3>
                                                    <textarea id={"textarea" + index}
                                                        defaultValue={attribute.textValue}
                                                        onChange={(e) => {
                                                            attribute.textValue = e.target.value;
                                                        }}
                                                    ></textarea>
                                                    <span className="text-danger">{attribute.errorMessage}</span> 
                                                </>
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
                                                            return <>

                                                                <div key={index} className="col-md-4 col-sm-4">
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

                                                            </>
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
                                                        return <>
                                                            <div className="row">
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
                                                        </>
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
                                                    const newvm = await CreateListing(vm)
                                                    setvm(newvm);
                                                } catch (e) {
                                                    e.json().then(error => {
                                                        seterror(error);
                                                    })
                                                }
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
    }
    </>
}