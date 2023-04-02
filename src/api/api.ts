import axios from "axios";

const API_BASE_URL =
  "https://solar-system-hackathon-backend.herokuapp.com/stellar";

export async function getStellarOverview() {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getStellarData(endpoint: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getObjectData(endpoint: string, id: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
