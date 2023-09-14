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
        //console.log(newvm);
    }

    useEffect(() => {
        loadData();
    }, []);


    return <>
        {
            vm == null ? <Loading /> :
                <div className="row">
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-10 col-md-8 bottom15 margin40">
                        <h2 className="text-uppercase bottom40">Property Listing</h2>
                        <div>
                            <div className="search-propertie-filters">
                                <div className="container-2">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className=" white">
                                                <span>Name</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className=" white">
                                                <label>{vm.name}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className=" white">
                                                <span>Location</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className=" white">
                                                {vm.location.city.name}, {vm.location.region.name} {vm.location.country.name}
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
                                            <label>{attribute.textValue}</label>
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
                                                            <span>{attribute.attributename}</span>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Features*/}
                            {/*Summary*/}
                            <div className="col-sm-12">
                                <h3 className="bottom15 margin40">{vm.quickSummary[0].sectionName}</h3>
                                <div className="search-propertie-filters">
                                    <div className="container-2 ">
                                        {
                                            vm.quickSummary.map((attribute, index) => {

                                                return <div className="row" key={index}>
                                                    {
                                                        attribute.attributeType === "CheckBox" ?
                                                            <div key={index} className="">
                                                                {
                                                                    attribute.attributeValues.length > 0 ?
                                                                        <div className="listing-av-container ">
                                                                            <div className="listing-av-checkbox-container-heading">{attribute.attributename}</div>
                                                                            <div className="listing-av-checkbox-container">
                                                                                {
                                                                                    attribute.attributeValues.map((av, i) => {
                                                                                        return <div key={i} className="listing-av-item white">
                                                                                            <span>{av.value}</span>
                                                                                        </div>
                                                                                    })}
                                                                            </div>
                                                                            <span className="text-danger">{attribute.errorMessage}</span>
                                                                        </div>
                                                                        :
                                                                        <div className="listing-checkbox-container white">
                                                                            <span>{attribute.attributename}</span>
                                                                        </div>
                                                                }
                                                            </div> :
                                                            <div key={index} className="">
                                                                <div className="listing-textbox-container white">
                                                                    <span>{attribute.attributename}</span>
                                                                    <span>{attribute.textValue}</span>
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
                        </div>
                    </div>
                    <div className="col-sm-1 col-md-2"></div>
                    <div className="col-sm-4">
                    </div>
                </div>
        }
    </>
}