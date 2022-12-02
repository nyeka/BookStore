import Axios from "axios";
import { useState, useEffect } from "react";

interface IGetData {
  api: string;
}

const useGetData = ({ api }: IGetData) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(api);
        setData(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [api]);

  return { data };
};

export default useGetData;
