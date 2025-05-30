import axios from 'axios';
const baseURL = 'https://viacep.com.br/ws/';

export const getAddressByZip = async (zip) => {
  const response = await axios.get(`${baseURL}${zip}/json/`)
  if (response.data.erro) {
    throw new Error('CEP inválido')
  }
  return response.data
}

