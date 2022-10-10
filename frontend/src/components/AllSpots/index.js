import React, {useEffect } from 'react';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import './AllSpots.css';


const AllSpots = (isLoaded) => {

    const sessionUser = useSelector(state => state.session.user);

    let addSpotButton;
    if (sessionUser) {
        addSpotButton = (
            <Link to="/spots/new">
                <button className='addSpotButton'>Add a spot</button>
            </Link>
        );
    } else {
        addSpotButton = (
            <div className='footer'>
                <LoginFormModal />
                <p>Want to earn extra money? log in to add a spot</p>
            </div>
        );
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getAllSpots()).catch(
            async (res) => {
                const data = await res.json();
                return data;
            })
    }, []);

    const spots = useSelector(state => state.spot.Spots);
    return (
        <div>
            <div className='spotList'>
                {spots?.map((spot)=>{
                    return (
                        <div className='singleSpot' key={spot.id}>
                            <h2>{spot.name}</h2>
                            <img src={spot.previewImage} alt='loading'className='previewImg'/>
                            <p>{spot.city}, {spot.country}</p>
                            <p>${spot.price} per night</p>
                            <Link to={`/spots/${spot.id}`}>
                                <button>
                                    View Detail
                                </button>
                            </Link>
                        </div>
                    )
                })}
            </div>
            {isLoaded && addSpotButton}
        </div>


    )
}

export default AllSpots
