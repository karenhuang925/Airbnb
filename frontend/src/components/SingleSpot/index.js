import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useParams, Route, Switch, Link } from 'react-router-dom';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal'
import ReviewBySpot from '../ReviewBySpot'
import ReviewFormModal from '../ReviewForm/ReviewFormModal'
import './SingleSpot.css'


const SingleSpot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams()
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        dispatch(spotActions.getTheSpotDetail(spotId))
        .then(() => setIsLoaded(true))
        .catch(
            async (error) => {
                if (error) setErrors(error.message);
            })
    }, [dispatch]);
    const spot = useSelector(state => state.spot.current);
    const sessionUser = useSelector(state => state.session.user);
    let editAndDelete;
    let showReview;

    if(redirect){
        return (
            <Redirect to="/spots" />
        )
    }

    if(spot){

        const deleteSpot = (e) => {
            e.preventDefault();
            dispatch(spotActions.deleteSpotFetch(spot.id))
            setRedirect(true)
        };



        if (sessionUser?.id === spot?.Owner?.id) {
            editAndDelete = (
                <div>
                    <Link to={`/spots/${spot?.id}/edit`}>
                        <button>Edit this spot</button>
                    </Link>
                    <button onClick={deleteSpot}>Delete this spot</button>
                </div>
            );
        } else {
            if(sessionUser){
                editAndDelete = (
                    <>
                        <ReviewFormModal />
                    </>
                );
            }
        }
        if ((parseInt(spot?.numReviews)) === parseInt(0)){
            showReview = (
                <p>This spot doesn't have review yet</p>
            )
        } else {
            if (!spotId) {
                return (<Redirect to='/spots'/>)
            }
            showReview = (
                <>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <span className="heading">User Rating</span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <p>{parseFloat(spot.avgStarRating).toFixed(2)} average based on {spot.numReviews} reviews.</p>
                    <hr style={{border: "3px", solid:"#f1f1f1"}}></hr>


                    <ReviewBySpot spotId={spot.id} />

                </>
            )
        }
    }
    if (errors.length > 0){
        return (
            <div>This spot is not available, please check later</div>
        )
    }
    return isLoaded && (
            <>
                {editAndDelete}
                <h1>{spot.name}</h1>
                <h2>{spot.state}, {spot.country}</h2>
                <p>Description: {spot.description}</p>
                <div className="row">
                    {spot.Images?.map((image, i)=>{
                        return (
                            <div className="column" key={i}>
                                <img src={image.url} alt={`image${i}`} />
                            </div>
                        )
                    })}
                </div>

                {showReview}
            </>

        )
}

export default SingleSpot
