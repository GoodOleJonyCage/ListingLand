
export const LoadCountries = async () => {

    let response = await fetch(`geo/countries`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        //method: 'POST',
        //body: JSON.stringify({ quizid: quizid }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw response;
}

export const LoadRegions = async (countryid) => {

    let response = await fetch(`geo/regions`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({ countryid: countryid }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw response;
}

export const LoadCities = async (regionid, cityname) => {

    let response = await fetch(`geo/cities`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({
            regionid: regionid,
            cityname: cityname
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw response;
}


export const GetNewListing = async () => {

    let response = await fetch(`listing/getnewlisting`, {
        //headers: {
        //    "Content-Type": "multipart/form-data"
        //},
        //method: 'POST',
        //body: data
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw response;
}


export const GetListing = async (_listingid) => {

    let response = await fetch(`listing/getlisting`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({ listingid: _listingid }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw response;
}

export const CreateListing = async (_vm) => {

    let response = await fetch(`listing/createlisting`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({ vm: _vm }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw response;
}