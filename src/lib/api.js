const FIREBASE_DOMAIN = 'https://react-http-4ee20-default-rtdb.firebaseio.com';

export async function getAllBookings() {  
  const response = await fetch(`${FIREBASE_DOMAIN}/bookings.json`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch bookings.');
  }

  const transformedBookings = [];

  for (const key in data) {
    const bookingObj = {
      id: key,
      ...data[key],
    };

    transformedBookings.push(bookingObj);
  }

  return transformedBookings;
}

export async function getAllPlaces() {  
  const response = await fetch(`${FIREBASE_DOMAIN}/places.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch places.');
  }

  const transformedPlaces = [];

  for (const key in data) {
    const placeObj = {
      id: key,
      ...data[key],
    };

    transformedPlaces.push(placeObj);
  }
  
  return transformedPlaces;
}

export async function getSingleBooking(bookingId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/bookings/${bookingId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch booking.');
  }

  const loadedBooking = {
    id: bookingId,
    ...data,
  };

  return loadedBooking;
}

export async function addBooking(bookingData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/bookings.json`, {
    method: 'POST',
    body: JSON.stringify(bookingData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create booking.');
  }

  return null;
}

export async function getSinglePlace(placeId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/places/${placeId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch booking.');
  }

  const loadedPlace = {
    id: placeId,
    ...data,
  };

  return loadedPlace;
}

export async function addPlace(placeData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/places.json`, {
    method: 'POST',
    body: JSON.stringify(placeData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create booking.');
  }

  return null;
}

export async function editPlace(placeData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/places/${placeData.id}.json`, {
    method: 'PUT',
    body: JSON.stringify(placeData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create booking.');
  }

  return null;
}

export async function editBooking(bookingData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/bookings/${bookingData.id}.json`, {
    method: 'PUT',
    body: JSON.stringify(bookingData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create booking.');
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
