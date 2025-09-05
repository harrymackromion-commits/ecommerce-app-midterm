import { useNavigate } from "react-router-dom"

export default function useRedirect() {
    const navigate = useNavigate();
    const redirect = (path, delay = 0) => {
      if (delay > 0) {
        setTimeout(() => navigate(path), delay);
      } else {
        navigate(path);
      }
    };
  return {redirect}
}
