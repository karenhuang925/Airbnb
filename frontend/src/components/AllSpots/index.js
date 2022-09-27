import React, { useState,useEffect } from 'react';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import { Redirec, NavLink, Switch, Route } from 'react-router-dom';
import SingleSpot from '../SingleSpot';
import './AllSpots.css';


const AllSpots = () => {

    const dispatch = useDispatch();
    // dispatch(spotActions.getAllSpots()).catch(
    //     async (res) => {
    //         const data = await res.json();
    //         return data
    //     }
    // );\

    useEffect(() => {
        dispatch(spotActions.getAllSpots()).catch(
            async (res) => {
                const data = await res.json();
                console.log(data)
                // return data;
            })
    }, []);

    const spots = useSelector(state => state.spot.Spots);
    return (
        <div>
            {spots?.map((spot)=>{
                return (
                    <div className='singleSpot' key={spot.id}>
                        <h1>{spot.name}</h1>
                        <img src={spot.previewImage} alt='loading'/>
                        <p>{spot.city}, {spot.country}</p>
                        <p>${spot.price} per night</p>
                        <button>
                            View Detail
                            <NavLink to={`/spot/${spot.id}`} />
                        </button>
                    </div>
                )
            })}

            <Switch>
                <Route path='/article/:id'>
                {spots && <SingleSpot spots={spots} />}
                </Route>
            </Switch>
        </div>


    )
}

export default AllSpots
