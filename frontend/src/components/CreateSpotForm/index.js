import SpotForm from '../SpotForm/index';

const CreateSpotForm = () => {
    const spot = {
        address: 'abc',
        city: 'abc',
        state: 'abc',
        country: 'abc',
        name: 'abc',
        lat: 0,
        lng: 0,
        description: 'abc',
        price: 0,
        previewImage: 'abc'
    };

    return (
        <SpotForm spot={spot} formType="Create spot" />
    );
}

export default CreateSpotForm;
