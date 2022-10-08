import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { addSpotFetch } from '../../store/spot'
import { editSpotFetch } from '../../store/spot'
import { useDispatch } from 'react-redux';
import './SpotForm.css'

const SpotForm = ({ spot, formType }) => {

    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [previewImage, setPreviewImage] = useState(spot.previewImage);
    const [errors, setErrors] = useState([]);

    if(redirect){
        return (
            <Redirect to={`/spots`} />
        )
    }

    const handleSubmit = (e) => {


        e.preventDefault();
        setErrors([]);
        spot = { ...spot, address, city, state, country, name, lat, lng, description, price, previewImage };
        if (formType === "Create spot"){
            dispatch(addSpotFetch(spot)).catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
            setRedirect(true)
        } else if(formType === "Edit spot"){
            dispatch(editSpotFetch(spot)).catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
            setRedirect(true)
        }

    };

    return (
        <form onSubmit={handleSubmit} >
            <h2>{formType}</h2>
            <h3>Let's get started</h3>
            <p>Where's your place located? <br/>Enter your address</p>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    required
                    />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    required
                    />
            </label>

            <p>Let us know more about your spot <br/>Enter Your House Details </p>

            <label>
                Name
                <input
                    type="text"
                    value={name || ""}
                    onChange={e => setName(e.target.value)}
                    required
                    />
            </label>
            <label>
                Price
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    />
            </label>
            <label>
                Description
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    />
            </label>
            <label>
                lat
                <input
                    type="number"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    />
            </label>
            <label>
                lng
                <input
                    type="number"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    />
            </label>
            <label>
                PreviewImage
                <input
                    type="url"
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                    required
                    />
            </label>
            <input type="submit" value={formType} />
        </form>
    );
}

export default SpotForm;
