import { useState, useEffect } from 'react'
import { GetNewListing, CreateListing } from '../Services/Services'

export const NewListing = () => {

    const [vm, setvm] = useState({});

    const loadData = async () => {

        const newvm = await GetNewListing();
        setvm(newvm);
        console.log(newvm);
        
    }

    useEffect(() => {
        loadData();
    }, []);

    return <>
            <div>new Listing</div>
            <button onClick={async (e) => {
                await CreateListing(vm)
            }}>Submit vm</button >
            </>
}