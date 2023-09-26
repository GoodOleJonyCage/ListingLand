
export const GetUserInfo = async (_username) => {

    let response = await fetch(`user/getuser`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({
            username: _username 
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw response;
}

export const LoginUser = async (_uname, _pwd) => {

    let response = await fetch(`user/loginuser`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({
            username: _uname,
            password:_pwd
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    throw response;
}

export const GetInitiazledUser = async () => {

    let response = await fetch(`user/getinitializeduser`, {
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

export const RegisterUser = async (data) => {

    let response = await fetch(`user/registeruser`, {
        //headers: {
        //    "Content-Type": "multipart/form-data"
        //},
        method: 'POST',
        body: data
    });
    if (response.ok) {
        return true;
    }
    throw response;
}

export const GetSearchVM = async () => {

    let response = await fetch(`listing/getsearchvm`, {
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

export const GetSearchResults = async (_vm) => {

    let response = await fetch(`listing/getsearchresults`, {
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

export const UploadFiles = async (data) => {

    let response = await fetch(`listing/uploadfiles`, {
        //headers: {
        //    "Content-Type": "multipart/form-data"
        //},
        method: 'POST',
        body: data
    });
    if (response.ok) {
        return true;
    }
    throw response;
}

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

export const DeleteListing = async (_listingid) => {

    let response = await fetch(`listing/deletelisting`, {
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

export const GetListingsByUserID = async (_username) => {

    let response = await fetch(`listing/getlistingsbyuserid`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        method: 'POST',
        body: JSON.stringify({ username: _username }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw response;
}

export const GetListings = async () => {

    let response = await fetch(`listing/getlistings`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': "Bearer " + getJwtToken()
        },
        //method: 'POST',
        //body: JSON.stringify({ listingid: _listingid }),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw response;
}

export const EditListing = async (_vm) => {

    let response = await fetch(`listing/editlisting`, {
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