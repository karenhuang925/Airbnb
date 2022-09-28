import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import './SingleSpot.css'


const SingleSpot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams()
    useEffect(() => {
        dispatch(spotActions.getTheSpotDetail(spotId)).catch(
            async (res) => {
                const spot = await res.json();
                return spot;
            })
    }, [dispatch]);
    const spot = useSelector(state => state.spot.current);
    // const spot = spots?.Spot[spotId]
    // const spot = spots.find(spot => spot.id === parseInt(spotId));
    return (
        <>
            <h1>{spot?.name}</h1>
            <h2>{spot?.state}, {spot?.country}</h2>
            <p>Description: {spot?.description}</p>
            <div className="row">
                {spot?.Images.map((image, i)=>{
                    return (
                        <div className="column" key={i}>
                            <img src={image.url} alt={`image${i}`} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SingleSpot
