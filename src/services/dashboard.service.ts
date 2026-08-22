// const API_URL = import.meta.env.VITE_API_MASTER_URL;
const API_URL = import.meta.env.VITE_API_EXAMPLE;

export const getUserDonationDashboardAPI = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/user/donation-dashboard`, { 
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) throw new Error("Gagal mengambil data dashboard donatur");
  const result = await response.json();
  return result.data;
};