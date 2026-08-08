const API_URL = import.meta.env.VITE_API_MASTER_URL || import.meta.env.VITE_API_EXAMPLE;
// const API_URL = import.meta.env.VITE_API_EXAMPLE;

export const getTransactionsAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil data riwayat transaksi.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal terhubung ke server.');
  }
};

export const getTransactionByIdAPI = async (id: string | number) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil detail transaksi.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Gagal terhubung ke server.');
  }
};