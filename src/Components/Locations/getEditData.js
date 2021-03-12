export const getEditData = (locationId, formData, lat, lng, userId, images) => {
  return {
    data: {
      type: "location",
      id: locationId,
      attributes: {
        name: formData.name,
        street: formData.street,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        lat,
        lng,
        about: formData.about,
      },
      relationships: {
        category: {
          data: {
            type: "category",
            id: formData.category,
          },
        },
      },
    },
  };
};
