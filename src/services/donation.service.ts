// const API_URL = import.meta.env.VITE_API_MASTER_URL;
const API_URL = import.meta.env.VITE_API_EXAMPLE;

export const createDonorAPI = async (payload: any) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/donors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Gagal membuat data donatur.");
  return await res.json();
};

export const createDonationAPI = async (payload: any) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/donations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Gagal menyimpan rincian bibit donasi.");
  return await res.json();
};

export const createTransactionAPI = async (payload: any) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Gagal membuat transaksi pembayaran.");
  return await res.json();
};