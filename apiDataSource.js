export const fetchCategories = async () => {
  try {
    const response = await fetch('https://library.darakhtdanesh.org/api/resource_categories/fa');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchResource = async () => {
  try {
    const response = await fetch('https://library.darakhtdanesh.org/api/resource/1234');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

