import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addSpotFetch } from '../../store/spot'
import { useDispatch } from 'react-redux';
import './SpotForm.css'

const SpotForm = ({ spot, formType }) => {
    const dispatch = useDispatch()
    // const history = useHistory();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        spot = { ...spot, address, city, state, country, name, lat, lng, description, price, previewImage };

        dispatch(addSpotFetch(spot))
        // history.push(`/spots/${spot.id}`);
    };

    return (
        <form onSubmit={handleSubmit} >
            <h2>{formType}</h2>
            <h3>Let's get started</h3>
            <p>Where's your place located? <br/>Enter your address</p>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    />
            </label>

            <p>Let us know more about your spot <br/>Enter Your House Details </p>

            <label>
                Name
                <input
                    type="text"
                    value={name || ""}
                    onChange={e => setName(e.target.value)}
                    />
            </label>
            <label>
                Price
                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />
            </label>
            <label>
                Description
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
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
                    />
            </label>
            <input type="submit" value={formType} />
        </form>
    );
}

export default SpotForm;
