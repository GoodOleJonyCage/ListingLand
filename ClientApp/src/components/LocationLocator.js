import { useEffect, useState } from 'react'
import { Loading } from './Loading'
import { LoadCountries, LoadRegions, LoadCities } from '../Services/Services'
import { Autocomplete, TextField } from '@mui/material';

export const LocationLocator = (props) => {

    //states for country, region and cities
    const [countries, setcountries] = useState([]);
    const [regions, setregions] = useState([]);
    const [cities, setcities] = useState([]);
    //states for country, region and cities

    //country, region and city helper methods
    const loadCountryList = async () => {
        let countrylist = await LoadCountries();
        setcountries(countrylist);

    }
    const loadRegionsList = async (countryid) => {
        let regionList = await LoadRegions(countryid);
        setregions(regionList);
    }

    const getSelectedCountry = () => {
        const item = countries.find((opt) => {
            if (opt.id === props.location.country.id) {
                return opt;
            }
        })
        return item || {};

    }
    const getSelectedRegion = () => {
        const item = regions.find((opt) => {
            if (opt.id === props.location.region.id) {
                return opt;
            }
        })
        return item || {};

    }
    const getSelectedCity = () => {
        const item = {
            id: props.location.city.id,
            name: props.location.city.name
        }
        return item || {};
    }
    //country, region and city helper methods

    const loadData = async () => {

        try {

            /*load countries, city and regions  */
            loadCountryList();
            if (props.location.country.id > 0)
                loadRegionsList(props.location.country.id);
            /*load countries, city and regions  */
        } catch (e) {

        }
    }
    useEffect(() => {
        loadData();
    }, []);


    return <>
        <p className="info-name">Address</p>
        <div className="info-details">
            <div className="mb-3 region-container">
              {/*  <div className="first-div">Country</div>*/}
                <div>
                    {countries.length === 0 ? <Loading></Loading> :
                        <Autocomplete
                            disablePortal
                            id="autocom-countries"
                            defaultValue={getSelectedCountry()}
                            onChange={(event, value) => {
                                if (value) {
                                    props.location.country.id = value.id;
                                    props.location.country.name = value.name;
                                    loadRegionsList(props.location.country.id);
                                }
                                else {
                                    props.location.country.id = 0;
                                    props.location.country.name = '';
                                }
                            }}

                            options={countries}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField  {...params} label="Country" />}
                        />
                    }
                </div>
            </div>
            <div className="mb-3 region-container">
                {/*<div className="first-div">Region</div>*/}
                <div>
                    {regions.length === 0 ? <div className="highlight-error">Select Country</div> :
                        <Autocomplete
                            disablePortal
                            id="autocom-region"
                            defaultValue={getSelectedRegion()}
                            onChange={(event, value) => {
                                if (value) {
                                    props.location.region.id = value.id;
                                    props.location.region.name = value.name;

                                } else {
                                    props.location.region.id = 0;
                                    props.location.region.name = '';
                                }
                                setcities([]);
                            }}
                            options={regions}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField  {...params} label="Region" />}
                        />
                    }
                </div>
            </div>
            <div className="mb-3 region-container">
               {/* <div className="first-div">City</div>*/}
                <div>
                    {props.location.region.id === 0 ? <div className="highlight-error">Select Region</div> :
                        <Autocomplete
                            disablePortal
                            id="autocom-cities"
                            defaultValue={getSelectedCity()}
                            onChange={(event, value) => {
                                if (value) {
                                    props.location.city.id = value.id;
                                    props.location.city.name = value.name;
                                }
                                else {
                                    props.location.city.id = 0;
                                    props.location.city.name = '';
                                }
                            }}
                            options={cities}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField
                                    onChange={async (event, value) => {
                                        const cities = await LoadCities(props.location.region.id, event.target.value);
                                        setcities(cities);
                                    }}
                                    {...params} label="City" />}
                        />
                    }
                </div>
            </div>
        </div>
    </>



}