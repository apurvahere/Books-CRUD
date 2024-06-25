import { useEffect, useState } from "react";

const useTimeout = (delay: number): boolean => {
  const [isTrue, setIsTrue] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTrue(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isTrue;
};

export default useTimeout;
