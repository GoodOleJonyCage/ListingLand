import { UserStore } from '../Store/UserStore'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
 
export const LogoutPage = () => {

    const { clearToken } = UserStore();
    const navigate = useNavigate();

    useEffect(() => {

        clearToken();
        navigate('/home'); 

    }, []);
 
}