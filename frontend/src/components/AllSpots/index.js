import React, {useEffect } from 'react';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import CreateSpotForm from '../CreateSpotForm'
import './AllSpots.css';


const AllSpots = (isLoaded) => {

    const sessionUser = useSelector(state => state.session.user);

    let addSpotButton;
    if (sessionUser) {
        addSpotButton = (
            <Link to="/spots/new">
                <button>Add a spot</button>
            </Link>
        );
    } else {
        addSpotButton = (
            <>
                <LoginFormModal />
                <p>Want to earn extra money? log in to add a spot</p>
            </>
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
            {isLoaded && addSpotButton}
            <div className='spotList'>
                {spots?.map((spot)=>{
                    return (
                        <div className='singleSpot' key={spot.id}>
                            <h1>{spot.name}</h1>
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
        </div>


    )
}

export default AllSpots
