import { getCategoryName } from "./getCategoryName";

export const locationData = (location, setFormData) => {
  setFormData({
    name: location.attributes.name,
    street: location.attributes.street,
    city: location.attributes.city,
    phone: location.attributes.phone,
    email: location.attributes.email,
    lat: location.attributes.lat,
    lng: location.attributes.lng,
    about: location.attributes.description,
    questions: location.attributes.questionsAndAnswers,
    images: location.attributes.images,
    category: getCategoryName(location.relationships.category.data.id),
  });
};
