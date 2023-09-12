
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