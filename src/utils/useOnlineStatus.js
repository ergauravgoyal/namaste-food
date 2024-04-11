import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  useEffect(() => {
    debugger;
    document.addEventListener("online", () => {
      debugger;
      setOnlineStatus(true);
    });
    document.addEventListener("offline", () => {
      debugger;
      setOnlineStatus(false);
    });
  }, []);
  return onlineStatus;
};

export default useOnlineStatus;
