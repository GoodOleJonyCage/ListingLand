import { useEffect } from 'react'

export const Footer = () => {

    useEffect(() => {
 

        let script = document.createElement("script");
        script.src = "js/range-Slider.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/owl.carousel.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/functions.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/jquery.cubeportfolio.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/selectbox-0.2.min.js";
        script.async = true;
        document.body.appendChild(script);

        script = document.createElement("script");
        script.src = "js/custom.js";
        script.async = true;
        document.body.appendChild(script);

    }, []);

    
    return <>
        {/* Partners */}
        <section id="logos">
            <div className="container partner2 padding">
                <div className="row">
                    <div className="col-sm-10">
                        <h2 className="uppercase">Our Partners</h2>
                        <p className="heading_space">Aliquam nec viverra erat. Aenean elit tellus mattis quis maximus.</p>
                    </div>
                </div>
                <div className="row">
                    <div id="partner-slider" className="owl-carousel">
                        <div className="item">
                            <img src="images/logo1.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo2.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo3.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo4.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo5.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo1.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo2.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo3.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo4.png" alt="Featured Partner" />
                        </div>
                        <div className="item">
                            <img src="images/logo5.png" alt="Featured Partner" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Partners */}

        {/* Footer */}
        <footer className="padding_top footer2">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <div className="footer_panel bottom30">
                            <a href="#." className="logo bottom30"><img src="images/logo-white.png" alt="logo" /></a>
                            <p className="bottom15">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                tempor cum consectetuer
                                adipiscing.</p>
                            <p className="bottom15">If you are interested in castle do not wait and <a href="#.">BUY IT NOW!</a></p>
                            <ul className="social_share">
                                <li><a href="#." className="facebook"><i className="icon-facebook-1"></i></a></li>
                                <li><a href="#." className="twitter"><i className="icon-twitter-1"></i></a></li>
                                <li><a href="#." className="google"><i className="icon-google4"></i></a></li>
                                <li><a href="#." className="linkden"><i className="fa fa-linkedin"></i></a></li>
                                <li><a href="#." className="vimo"><i className="icon-vimeo3"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="footer_panel bottom30">
                            <h4 className="bottom30">Search by Area</h4>
                            <ul className="area_search">
                                <li><a href="#."><i className="icon-icons74"></i>Bayonne, New Jersey</a></li>
                                <li className="active"><a href="#."><i className="icon-icons74"></i>Greenville, New Jersey</a></li>
                                <li><a href="#."> <i className="icon-icons74"></i>The Heights, New Jersey</a></li>
                                <li><a href="#."><i className="icon-icons74"></i>West Side, New York</a></li>
                                <li><a href="#."><i className="icon-icons74"></i>Upper East Side, New York</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="footer_panel bottom30">
                            <h4 className="bottom30">Latest News</h4>
                            <div className="media">
                                <a className="media-object"><img src="images/footer-news1.png" alt="news" /></a>
                                <div className="media-body">
                                    <a href="#.">Nearest mall in high tech Goes your villa</a>
                                    <span><i className="icon-clock4"></i>Feb 22, 2017</span>
                                </div>
                            </div>
                            <div className="media">
                                <a className="media-object"><img src="images/footer-news1.png" alt="news" /></a>
                                <div className="media-body">
                                    <a href="#.">Nearest mall in high tech Goes your villa</a>
                                    <span><i className="icon-clock4"></i>Feb 22, 2017</span>
                                </div>
                            </div>
                            <div className="media">
                                <a className="media-object"><img src="images/footer-news1.png" alt="news" /></a>
                                <div className="media-body">
                                    <a href="#.">Nearest mall in high tech Goes your villa</a>
                                    <span><i className="icon-clock4"></i>Feb 22, 2017</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="footer_panel bottom30">
                            <h4 className="bottom30">Get in Touch</h4>
                            <ul className="getin_touch">
                                <li><i className="icon-telephone114"></i>01 900 234 567 - 68</li>
                                <li><a href="#."><i className="icon-icons142"></i>info@castle.com</a></li>
                                <li><a href="#."><i className="icon-global"></i>www.castle.com</a></li>
                                <li><i className="icon-icons74"></i>Castle Melbourne, Merrick Way,FL 12345 australia</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        {/* Footer */}

        {/* CopyRight */}
        <div className="copyright index2">
            <div className="copyright_inner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <p>Copyright &copy; 2017 <span>Castle</span>. All rights reserved.</p>
                        </div>
                        <div className="col-md-5 text-right">
                            <p>Designed by <a href="#.">Brighthemes</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* CopyRight */}
    </>

}