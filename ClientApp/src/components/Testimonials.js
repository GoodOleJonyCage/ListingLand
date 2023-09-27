import { useState, useEffect } from 'react'
import { GetTestimonials } from '../Services/Services'
import { Loading } from '../components/Loading'

export const Testimonials = (props) => {
     
    const [testimonials, settestimonials] = useState(null);
    const [loaded, setloaded] = useState(false);

    const loadScript = async (props) => {
 
        let script = document.createElement("script");
        script.async = true;
        var scripttext = `$('##id').cubeportfolio({
                        layoutMode: 'grid',
                        gapHorizontal: 50,
                        gapVertical: 20,
                        gridAdjustment: 'responsive',
                        mediaQueries: [{
                            width: 1500,
                            cols: 3
                        }, {
                            width: 1100,
                            cols: 3
                        }, {
                            width: 800,
                            cols: 3
                        }, {
                            width: 480,
                            cols: 2
                        }, {
                            width: 320,
                            cols: 1
                        }],
                    });`;
        scripttext = scripttext.replace('#id', "test" + props.id);
        script.text = scripttext;
        document.body.appendChild(script);
    }
    const loadData = async () => {

        const vm = await GetTestimonials(props.id);
        settestimonials(vm);
        //console.log(vm);
        setloaded(true);
    }

    useEffect(() => {
        loadData();
        loadScript(props);
    }, [loaded]);

    return <>
        {
            testimonials === null ? <Loading></Loading> :
                testimonials.length === 0 ? <></> :
                    <div id={"test" + props.id} className="cbp">
                        {
                            testimonials.map((testimonial, index) => {
                                return <div key={index} className="cbp-item">
                                    <div className="cbp-caption-defaultWrap">
                                        <div className="testinomial_box">
                                            <div className="testinomial_desc blue_dark  text-center">
                                                <p>{testimonial.testimonial}</p>
                                                <img src="images/quote.png" alt="quote" className="quote" />
                                            </div>
                                            <div className="testinomial_author">
                                                <img src="images/testinomils.png" alt="testinomial" width="59" />
                                                <h4 className="color">{testimonial.by}</h4>
                                                <span className="post_img"><i>{testimonial.dateStr}</i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
        }
    </>

}