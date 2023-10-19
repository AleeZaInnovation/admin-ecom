import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/new/`, brand, config);

  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);

  return response.data;
};

export const deleteCourse = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });

    const { data } = await axios.delete(`${base_url}brand/${id}`, config);

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
