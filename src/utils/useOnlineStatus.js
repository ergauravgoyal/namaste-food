import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [status, setStatus] = useState(true);
  useEffect(() => {
    document.addEventListener("online", () => {
      setStatus(true);
    });
    document.addEventListener("offline", () => {
      setStatus(false);
    });
  }, []);
  return status;
};

export default useOnlineStatus;
