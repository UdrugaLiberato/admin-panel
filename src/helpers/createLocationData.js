import { getUserId } from "../context/user";

export const createLocationData = (formData, lat, lng, images) => {
  return {
    data: {
      type: "location",
      attributes: {
        name: formData.name,
        street: formData.street,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        lat: +lat,
        lng: +lng,
        about: formData.about,
        images,
        questionsAndAnswers: [],
      },
      relationships: {
        category: {
          data: {
            type: "category",
            id: formData.category,
          },
        },
        user: {
          data: {
            type: "user",
            id: getUserId(),
          },
        },
      },
    },
  };
};
