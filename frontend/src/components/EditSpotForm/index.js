import { useEffect, useState } from 'react';
import { useParams, Route, Switch, Link } from 'react-router-dom';
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import SpotForm from  '../SpotForm'

const EditSpotForm = () => {

    let spot = useSelector(state => state.spot.current)

    if(spot){
        return (
            <SpotForm spot={spot} formType="Edit spot" />
        );
    }
}

export default EditSpotForm;
