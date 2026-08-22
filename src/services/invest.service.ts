const API_URL = import.meta.env.VITE_API_EXAMPLE;

export const getPublicProgramsAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/programs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Gagal mengambil data program investasi.');
    }

    return result.payload.data;
  } catch (error) {
    throw error;
  }
};