// const API_URL = import.meta.env.VITE_API_MASTER_URL;
const API_URL = import.meta.env.VITE_API_EXAMPLE;

export const getDonationProgramsAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/donation-programs`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil data program donasi.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal terhubung ke server.');
  }
};

export const getDonationProgramByIdAPI = async (id: string | number) => {
  try {
    const response = await fetch(`${API_URL}/donation-programs/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil detail program donasi.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal terhubung ke server.');
  }
};