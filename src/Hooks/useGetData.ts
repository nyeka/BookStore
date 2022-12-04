import Axios from "axios";
import { useState, useEffect } from "react";

interface IGetData {
  api: string;
}

const useGetData = ({ api }: IGetData) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(api);
        setData(response.data.items);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [api]);

  return { data, loading };
};

export default useGetData;
