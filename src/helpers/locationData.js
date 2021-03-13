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
    published: location.attributes.published,
    featured: location.attributes.featured,
    images: location.attributes.images,
    category: location.relationships.category.data.id,
  });
};
