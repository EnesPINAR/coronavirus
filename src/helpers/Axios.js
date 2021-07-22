import Axios from "axios";

const AxiosInstance = Axios.create({
    baseURL: 'https://covid-19-statistics.p.rapidapi.com/reports',
    headers: {
        'x-rapidapi-key': '1066fa9cd7msh79d527109c3cebap125a7ejsnde9934b74163',
        'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
    }
});

export default AxiosInstance;