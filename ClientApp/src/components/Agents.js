import { useEffect, useState } from 'react'
import { GetUsers } from '../Services/Services'
import { Loading } from '../components/Loading'
import { Testimonials} from '../components/Testimonials'

export const Agents = () => {

    const [users, setusers] = useState(null);
    const [loaded, setloaded] = useState(false);

    const loadScript = async (props) => {

        let script = document.createElement("script");
        script.async = true;
        var scripttext = `var $active = $('#accordion .panel-collapse.in').prev().addClass('active');
                          $active.find('a').append('<i class="fa fa-minus-circle"></i>');
                          $('#accordion .panel-heading').not($active).find('a').append('<i class="fa fa-plus-circle"></i>');
                          $('#accordion').on('show.bs.collapse', function (e) {
                          $('#accordion .panel-heading.active').removeClass('active').find('.fa').toggleClass('fa-plus-circle fa-minus-circle');
                           $(e.target).prev().addClass('active').find('.fa').toggleClass('fa-plus-circle fa-minus-circle');
                          })`;
        script.text = scripttext;
        document.body.appendChild(script);
    }

    const loadData = async () => {
        const vm = await GetUsers();
        setusers(vm);
        setloaded(true);
       console.log(vm);
    }

    useEffect(() => {
        loadData();
        loadScript();
    }, [loaded]);

    return <>
        <section id="news-section-1" className="property-details padding_top">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="panel-group" id="accordion">
                                    {
                                        users === null ? <Loading></Loading> :
                                            users.map((user, index) => {
                                                return <div key={index} className="panel panel-default">
                                                    <div className="panel-heading ">
                                                        <h4 className="panel-title accordian-panel-container">
                                                            <a className={index === 0 ? "active accordion-toggle"  : "accordion-toggle "} data-toggle="collapse" data-parent="#accordion" href={"#panel" + user.id }>
                                                                {user.name}
                                                            </a>
                                                            <div>
                                                                <img src={user.image} alt="image"></img>
                                                            </div>
                                                        </h4>
                                                    </div>
                                                    <div id={"panel" + user.id} className={"panel-collapse collapse in"}>
                                                        <div className="panel-body">
                                                            <div className="agent-container bottom20 top20">
                                                                <div className="image-container">
                                                                    <img src={user.image } ></img>
                                                                </div>
                                                                <div>        
                                                                    <div>Email</div>
                                                                    <div>{user.emailAddress }</div>
                                                                </div>
                                                                <div>
                                                                    <div>Name</div>
                                                                    <div>{user.name}</div>
                                                                </div>
                                                                <div>
                                                                    <div>Telephone</div>
                                                                    <div>{user.telephone}</div>
                                                                </div>
                                                            </div>
                                                            <p className="bottom20">{user.about}</p>
                                                            <Testimonials id={user.id}></Testimonials>
                                                        </div>
                                                    </div>
                                                   </div>
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
}