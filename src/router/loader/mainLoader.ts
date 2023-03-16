import { getChartDataApi } from 'utils/api/chart';

const mainLoader = async () => {
  const {
    data: { response },
  } = await getChartDataApi();
  return response;
};
export default mainLoader;
