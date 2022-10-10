import {Link} from 'react-router-dom'
import './About.css'

const AboutPage = () => {
    return (
        <div className='aboutContainer'>
            <div className='aboutInfo'>
                <h3>
                    Hi I'm Karen <i class="em em-wave" aria-role="presentation" aria-label="BIRD"></i>
                </h3>
                <p>I'm a full-stack developer based in the Bay Area, Califronia.
                I am currently a business operations and marketing lead at Airmart. In my free time, I love traveling with my dog Winston and explore the great outdoors.
                </p>
                <a href="https://www.linkedin.com/in/karen-huang-274b5b10b"><i className="fa-brands fa-linkedin-in" /></a>
                <a href="https://github.com/karenhuang925"><i className="fa-brands fa-github" /></a>
            </div>
            <img className='avatar' src="https://thumbs.dreamstime.com/b/pug-puppy-armour-space-suit-engraving-vector-pug-puppy-armour-space-suit-sketch-engraving-vector-illustration-scratch-board-141765938.jpg" />
        </div>
    )
}

export default AboutPage
