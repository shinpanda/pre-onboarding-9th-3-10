import axios from 'axios';

export const getChartDataApi = async () => {
  return await axios.get(`/data/mock_data_examples-flexsys.json`);
};
