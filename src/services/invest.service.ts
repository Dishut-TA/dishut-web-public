// const API_URL = import.meta.env.VITE_API_INVEST_URL;
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

export const getProgramByIdAPI = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/programs/${id}`, {
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

    return result.payload;
  } catch (error) {
    throw error;
  }
};

export const postInvestasiAPI = async (data: any, token: string, userId: string | number) => {
  try {
    const response = await fetch(`${API_URL}/investor/pendanaan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-User-Id': String(userId)
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Gagal melakukan investasi.');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getRiwayatTransaksiAPI = async (token: string, userId: string | number) => {
  try {
    const response = await fetch(`${API_URL}/investor/riwayat-transaksi`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-User-Id': String(userId)
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Gagal mengambil riwayat transaksi investasi.');
    }

    return result.payload.data || result.payload || [];
  } catch (error) {
    throw error;
  }
};

export const simulatePaymentWebhookAPI = async (transactionId: string) => {
  try {
    const response = await fetch(`${API_URL}/pendanaan/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // Sesuai dengan payload yang dibaca oleh backend: $request->input('transaksi_id')
      body: JSON.stringify({ transaksi_id: transactionId })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Gagal memproses webhook pembayaran.');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getWalletAPI = async (token: string, userId: string | number) => {
  try {
    const response = await fetch(`${API_URL}/investor/wallet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-User-Id': String(userId)
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Gagal mengambil data wallet.');
    }

    return result.payload;
  } catch (error) {
    throw error;
  }
};

export const getLaporanProyekAPI = async (token: string, userId: string | number) => {
  try {
    const response = await fetch(`${API_URL}/investor/laporan-proyek`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-User-Id': String(userId)
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Gagal mengambil laporan proyek.');
    return result.payload.data || result.payload || [];
  } catch (error) {
    throw error;
  }
};

export const getLaporanProyekByIdAPI = async (token: string, userId: string | number, id: string) => {
  try {
    const response = await fetch(`${API_URL}/investor/laporan-proyek/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-User-Id': String(userId)
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Gagal mengambil detail laporan proyek.');
    return result.payload;
  } catch (error) {
    throw error;
  }
};

export const getLaporanKeuanganAPI = async (token: string, userId: string | number) => {
  try {
    const response = await fetch(`${API_URL}/investor/laporan-keuangan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-User-Id': String(userId)
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Gagal mengambil laporan keuangan.');
    return result.payload.data || result.payload || [];
  } catch (error) {
    throw error;
  }
};

export const getLaporanKeuanganByIdAPI = async (token: string, userId: string | number, id: string) => {
  try {
    const response = await fetch(`${API_URL}/investor/laporan-keuangan/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-User-Id': String(userId)
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Gagal mengambil detail laporan keuangan.');
    return result.payload;
  } catch (error) {
    throw error;
  }
};
