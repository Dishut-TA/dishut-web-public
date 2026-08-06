// const API_URL = import.meta.env.VITE_API_EXAMPLE;
const API_URL = import.meta.env.VITE_API_MASTER_URL 

export const getDonorsAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/donors`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Gagal mengambil data donatur.");
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Gagal terhubung ke server.");
  }
};