import ReviewFormPage from './index';

const CreateReviewForm = ({spotId}) => {
    const review = {
        content: 'Great place, recommended!',
        stars: 5,
        spotId: spotId
    };

    return (
        <ReviewFormPage review={review} formType="Create review" />
    );
}

export default CreateReviewForm;
