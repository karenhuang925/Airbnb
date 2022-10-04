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
        previewImage: 'https://media.vrbo.com/lodging/86000000/85030000/85028000/85027912/09fe29a9.f10.jpg'
    };

    return (
        <SpotForm spot={spot} formType="Create spot" />
    );
}

export default CreateSpotForm;
