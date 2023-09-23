import { useState, useEffect } from 'react'
import { Loading } from './Loading'
import { GetInitiazledUser, RegisterUser, LoginUser } from '../Services/Services'

export const Login = () => {

    const Register = () => {

        const [vm, setvm] = useState(null);
        const [image, setImage] = useState('/images/no-image-available.jpeg');
        const [registererror, setregistererror] = useState('');
        const [userregistered, setuserregistered] = useState(false);

        const loadData = async () => {

            const newvm = await GetInitiazledUser();
            setvm(newvm);
            //console.log(newvm);
        }

        useEffect(() => {
            loadData();
        }, []);

        const onImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                setImage(URL.createObjectURL(event.target.files[0]));
            }
        }

        return <>
            {
                vm === null ? <Loading></Loading> :
                    userregistered ?
                        <div className="register-container">
                            <div className="user-registered-message bottom20 top20">User Registered </div>
                            <button className="btn-slide"
                                onClick={(e) => { e.preventDefault(); setuserregistered(false); }}
                            >Register Another ?</button>
                        </div>
                        :
                        <form className="callus clearfix">
                            <div className="single-query col-sm-12 form-group">
                                <input
                                    onChange={(e) => { vm.emailAddress = e.target.value; }}
                                    type="text" className="keyword-input" placeholder="Email Address" />
                            </div>
                            <div className="single-query col-sm-12 form-group">
                                <input
                                    onChange={(e) => { vm.password = e.target.value; }}
                                    type="password" className="keyword-input" placeholder="Password" />
                            </div>
                            <div className="single-query col-sm-12 form-group">
                                <input
                                    onChange={(e) => { vm.name = e.target.value; }}
                                    type="text" className="keyword-input" placeholder="Name" />
                            </div>

                            <div className="single-query col-sm-12 form-group">
                                <input
                                    onChange={(e) => { vm.telephone = e.target.value; }}
                                    type="text" className="keyword-input" placeholder="Telephone" />
                            </div>
                            <div>
                                <input type="file" id="files" name="files"
                                    onChange={onImageChange} className="btn-blue border_radius margin40 filetype file-uploader" />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImage(null);
                                        document.getElementById("files").value = null
                                    }}
                                    className="btn-yellow border_radius margin40" >Clear Image <i className="icofont-paper-plane"></i></button>
                                <div className="register-img-container bottom30 top30">
                                    <img alt="" src={image} />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 text-center highlight-error bottom10 top10">
                                {registererror}
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                <div className="query-submit-button">
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            try {
                                                setregistererror('');
                                                const dataArray = new FormData();
                                                const filedata = document.getElementById("files").files[0];
                                                dataArray.append("files", filedata);
                                                dataArray.append("vm", JSON.stringify(vm));
                                                const result = await RegisterUser(dataArray);
                                                setuserregistered(true);

                                            } catch (e) {
                                                e.text().then(error => { setregistererror(error); });
                                            }
                                        }}
                                        className="btn-slide" >Creat an Account</button>
                                </div>
                            </div>
                        </form>
            }
        </>

    }

    const LoginForm = () => {

        const [username, setusername] = useState('');
        const [password, setpassword] = useState('');
        const [error, seterror] = useState('');

        return <>
            <form action="#" className="callus clearfix">
                <div className="single-query form-group col-sm-12">
                    <input
                        onChange={(e) => { setusername(e.target.value); }}
                        type="text" className="keyword-input" placeholder="Username" />
                </div>
                <div className="single-query form-group  col-sm-12">
                    <input
                        onChange={(e) => { setpassword(e.target.value); }}
                        type="password" className="keyword-input" placeholder="Password" />
                </div>
                {/*<div className="row">*/}
                {/*    <div className="col-sm-12">*/}
                {/*        <div className="col-sm-6">*/}
                {/*            <div className="search-form-group white form-group text-left">*/}
                {/*                <div className="check-box-2"><i><input type="checkbox" name="check-box" /></i></div>*/}
                {/*                <span>Remember Me</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="col-sm-6 text-right">*/}
                {/*            <a href="/#" className="lost-pass">Lost your password?</a>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="highlight-error col-sm-12 top10 bottom10">
                    {error}
                </div>
                <div className=" col-sm-12">
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            try {
                                const token = await LoginUser(username, password);
                                //redirect after saving token
                            } catch (exc) {
                               exc.json().then(error => { seterror (error)});
                            }
                        }}
                        className="btn-slide border_radius" >Login</button>
                </div>
            </form>
        </>
    }

    return <>
        <section id="login" className="padding">
            <div className="container">
                <h3 className="hidden">hidden</h3>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="profile-login">
                            {/* Nav tabs */}
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Login</a></li>
                                <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Register</a></li>
                            </ul>
                            {/*Tab panes */}
                            <div className="tab-content padding_half">
                                <div role="tabpanel" className="tab-pane fade in active" id="home">
                                    <div className="agent-p-form">
                                        <LoginForm></LoginForm>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane fade" id="profile">
                                    <div className="agent-p-form">
                                        <Register></Register>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}