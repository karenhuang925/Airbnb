import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spot';
import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';




const UserSpot = (isLoaded) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        dispatch(spotActions.getUserSpotFetch())
        .catch(
            async (error) => {
                if (error) setErrors(error.message);
            })
    }, [dispatch]);

    let spots = useSelector(state => state.spot.Spots);

    return (
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
    )
}

export default UserSpot
