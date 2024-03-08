import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useCustomParams = () => {
  const { search } = useLocation();
  const [params, setParams] = useState();
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
  }, [search]);
  return { ...params };
};
export default useCustomParams;
