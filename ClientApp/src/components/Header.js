import { useEffect } from 'react'

export const Header = () => {

    useEffect(() => {
         
        const script = document.createElement("script");
        script.src = "js/bootsnav.js";
        script.async = true;
        document.body.appendChild(script);

    }, []);

    return <>
        <header className="layout_dark">
            <div className="topbar white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <p>We are Best in Town With 40 years of Experience.</p>
                        </div>
                        <div className="col-md-7 text-right">
                            <ul className="breadcrumb_top text-right">
                                <li><a href="favorite_properties.html"><i className="icon-icons43"></i>Favorites</a></li>
                                <li><a href="submit_property.html"><i className="icon-icons215"></i>Submit Property</a></li>
                                <li><a href="my_properties.html"><i className="icon-icons215"></i>My Property</a></li>
                                <li><a href="profile.html"><i className="icon-icons230"></i>Profile</a></li>
                                <li><a href="login.html"><i className="icon-icons179"></i>Login / Register</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-upper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <div className="logo">
                                <a href="index4.html"><img alt="" src="images/logo-white.png"/></a>
                            </div>
                        </div>
                        {/* Info Box*/ }
                       
                        <div className="col-md-9 col-sm-12 right">
                            <div className="info-box first">
                                <div className="icons"><i className="icon-telephone114"></i></div>
                                <ul>
                                    <li><strong>Phone Number</strong></li>
                                    <li>+1 900 234 567 - 68</li>
                                </ul>
                            </div>
                            <div className="info-box">
                                <div className="icons"><i className="icon-icons74"></i></div>
                                <ul>
                                    <li><strong>Manhattan Hall,</strong></li>
                                    <li>Castle Melbourne, australia</li>
                                </ul>
                            </div>
                            <div className="info-box">
                                <div className="icons"><i className="icon-icons142"></i></div>
                                <ul>
                                    <li><strong>Email Address</strong></li>
                                    <li><a href="#.">info@castle.com</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-default navbar-sticky bootsnav">
                <div className="container">
                    <div className="attr-nav">
                        <ul className="social_share clearfix">
                            <li><a href="#." className="facebook"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#." className="twitter"><i className="fa fa-twitter"></i></a></li>
                            <li><a className="google" href="#."><i className="icon-google4"></i></a></li>
                        </ul>
                    </div>
                    {/* Start Header Navigation*/}
                    
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                            <i className="fa fa-bars"></i>
                        </button>
                        <a className="navbar-brand sticky_logo" href="index4.html"><img src="images/logo-white.png" className="logo" alt=""/></a>
                    </div> 
                    {/* Start Header Navigation*/}
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <ul className="nav navbar-nav" data-in="fadeIn" data-out="fadeOut">
                            <li className="dropdown active">
                                <a href="#." className="dropdown-toggle" data-toggle="dropdown">Home </a>
                                <ul className="dropdown-menu">
                                    <li><a href="index.html">Home Style 1</a></li>
                                    <li><a href="index2.html">Home Style 2</a></li>
                                    <li><a href="index3.html">Home Style 3</a></li>
                                    <li><a href="index4.html">Home Style 4</a></li>
                                    <li> <a href="index5.html">Home Style 5</a></li>
                                    <li> <a href="index6.html">Home Style 6</a></li>
                                    <li> <a href="index7.html">Home Style 7</a></li>
                                    <li> <a href="index8.html">Home Style 8</a></li>
                                    <li> <a href="index9.html">Home Style 9</a></li>
                                    <li> <a href="fullscreen.html">Home Fullscreen<span>new</span></a></li>
                                </ul>
                            </li>
                            <li className="dropdown megamenu-fw">
                                <a href="/#" className="dropdown-toggle" data-toggle="dropdown">Listing</a>
                                <ul className="dropdown-menu megamenu-content" role="menu">
                                    <li>
                                        <div className="row">
                                            <div className="col-menu col-md-3">
                                                <h5 className="title">PROPERTIES LIST</h5>
                                                <div className="content">
                                                    <ul className="menu-col">
                                                        <li><a href="listing1.html">Properties List</a></li>
                                                        <li><a href="index7.html">Single Property</a></li>
                                                        <li><a href="listing2.html">Search by City</a></li>
                                                        <li><a href="listing5.html">Search by Category</a></li>
                                                        <li><a href="listing3.html">Search by Type</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-menu col-md-9">
                                                <h5 className="title bottom20">PROPERTIES LIST</h5>
                                                <div className="row">
                                                    <div id="nav_slider" className="owl-carousel">
                                                        <div className="item">
                                                            <div className="image bottom15">
                                                                <img src="images/nav-slider1.jpg" alt="Featured Property"/>
                                                                    <span className="nav_tag yellow text-uppercase">for rent</span>
                                                            </div>
                                                            <h4><a href="property_detail1.html">Park Avenue Apartment</a></h4>
                                                            <p>Towson London, MR 21501</p>
                                                        </div>
                                                        <div className="item">
                                                            <div className="image bottom15">
                                                                <img src="images/nav-slider2.jpg" alt="Featured Property"/>
                                                                    <span className="nav_tag yellow text-uppercase">for rent</span>
                                                            </div>
                                                            <h4><a href="property_detail2.html">Park Avenue Apartment</a></h4>
                                                            <p>Towson London, MR 21501</p>
                                                        </div>
                                                        <div className="item">
                                                            <div className="image bottom15">
                                                                <img src="images/nav-slider3.jpg" alt="Featured Property"/>
                                                                    <span className="nav_tag yellow text-uppercase">for rent</span>
                                                            </div>
                                                            <h4><a href="property_detail3.html">Park Avenue Apartment</a></h4>
                                                            <p>Towson London, MR 21501</p>
                                                        </div>
                                                        <div className="item">
                                                            <div className="image bottom15">
                                                                <img src="images/nav-slider1.jpg" alt="Featured Property"/>
                                                                    <span className="nav_tag yellow text-uppercase">for rent</span>
                                                            </div>
                                                            <h4><a href="property_detail1.html">Park Avenue Apartment</a></h4>
                                                            <p>Towson London, MR 21501</p>
                                                        </div>
                                                        <div className="item">
                                                            <div className="image bottom15">
                                                                <img src="images/nav-slider2.jpg" alt="Featured Property"/>
                                                                    <span className="nav_tag yellow text-uppercase">for rent</span>
                                                            </div>
                                                            <h4><a href="property_detail2.html">Park Avenue Apartment</a></h4>
                                                            <p>Towson London, MR 21501</p>
                                                        </div>
                                                        <div className="item">
                                                            <div className="image bottom15">
                                                                <img src="images/nav-slider3.jpg" alt="Featured Property"/>
                                                                    <span className="nav_tag yellow text-uppercase">for rent</span>
                                                            </div>
                                                            <h4><a href="property_detail3.html">Park Avenue Apartment</a></h4>
                                                            <p>Towson London, MR 21501</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown megamenu-fw">
                                <a href="/#" className="dropdown-toggle" data-toggle="dropdown">Properties</a>
                                <ul className="dropdown-menu megamenu-content bg" role="menu">
                                    <li>
                                        <div className="row">
                                            <div className="col-menu col-md-3">
                                                <h5 className="title">PROPERTY LISTINGS</h5>
                                                <div className="content">
                                                    <ul className="menu-col">
                                                        <li><a href="listing1.html">List Style 1</a></li>
                                                        <li><a href="listing2.html">List Style 2</a></li>
                                                        <li><a href="listing3.html">List Style 3</a></li>
                                                        <li><a href="listing4.html">List Style 4</a></li>
                                                        <li><a href="listing5.html">List Style 5</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-menu col-md-3">
                                                <h5 className="title">PROPERTY LISTINGS</h5>
                                                <div className="content">
                                                    <ul className="menu-col">
                                                        <li><a href="listing6.html">List Style 5</a></li>
                                                        <li><a href="listing7.html">List Style 6</a></li>
                                                        <li><a href="listing1.html">Search by City</a></li>
                                                        <li><a href="listing2.html">Search by Category</a></li>
                                                        <li><a href="listing3.html">Search by Type</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-menu col-md-3">
                                                <h5 className="title">PROPERTY DETAIL</h5>
                                                <div className="content">
                                                    <ul className="menu-col">
                                                        <li><a href="property_detail1.html">Property Detail 1</a></li>
                                                        <li><a href="property_detail2.html">Property Detail 2</a></li>
                                                        <li><a href="property_detail3.html">Property Detail 3</a></li>
                                                        <li><a href="index7.html">Single Property</a></li>
                                                        <li><a href="listing4.html">Search by Type</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-menu col-md-3">
                                                <h5 className="title">OTHER PAGES</h5>
                                                <div className="content">
                                                    <ul className="menu-col">
                                                        <li><a href="favorite_properties.html">Favorite Properties</a></li>
                                                        <li><a href="agent_profile.html">Agent Profile</a></li>
                                                        <li><a href="404.html">404 Error</a></li>
                                                        <li><a href="contact.html">Contact Us</a></li>
                                                        <li><a href="testimonial.html">Testimonials</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#." className="dropdown-toggle" data-toggle="dropdown">Features </a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown">
                                        <a href="#." className="dropdown-toggle" data-toggle="dropdown">News</a>
                                        <ul className="dropdown-menu">
                                            <li><a href="news.html">news Style1</a></li>
                                            <li><a href="news2.html">news Style2</a></li>
                                            <li><a href="news3.html">news Style3</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#." className="dropdown-toggle" data-toggle="dropdown">Property Agents</a>
                                        <ul className="dropdown-menu">
                                            <li><a href="agent1.html">Agent Style1</a></li>
                                            <li><a href="agent2.html">Agent Style2</a></li>
                                            <li><a href="agent3.html">Agent Style3</a></li>
                                            <li><a href="agent4.htm4">Agent Style4</a></li>
                                            <li><a href="agent5.htm5">Agent Style5</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#." className="dropdown-toggle" data-toggle="dropdown">Agetn Profile Styles</a>
                                        <ul className="dropdown-menu">
                                            <li><a href="agent_profile.html">Agent Profile 1</a></li>
                                            <li><a href="agent_profile2.html">Agent Profile 2</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#." className="dropdown-toggle" data-toggle="dropdown">Testimonials</a>
                                        <ul className="dropdown-menu">
                                            <li><a href="testimonial.html">Style 1</a></li>
                                            <li><a href="testimonial2.html">Style 2</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#." className="dropdown-toggle" data-toggle="dropdown">FAQ's</a>
                                        <ul className="dropdown-menu">
                                            <li><a href="faq.html">Style 1</a></li>
                                            <li><a href="faq2.html">Style 2</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="favorite_properties.html">Favorite Properties</a></li>
                                    <li className="dropdown">
                                        <a href="#." className="dropdown-toggle" data-toggle="dropdown">404 Error</a>
                                        <ul className="dropdown-menu">
                                            <li><a href="404.html">404 Error 1</a></li>
                                            <li><a href="404-2.html">404 Error 2</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="contact.html">Contact Us</a></li>
                            <li><a href="https://themeforest.net/item/castle-real-estate-template/18593260?ref=BrighThemes">Buy Now</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>
}

               