import { NewListing } from '../components/NewListing'
import { UserStore } from '../Store/UserStore'
import { LoginPage } from '../Pages/LoginPage'

export const NewListingPage = () => {

    const { getUsername } = UserStore();

    return getUsername() === null ? <LoginPage/> : <NewListing></NewListing>

}