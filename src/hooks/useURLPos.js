import { useSearchParams } from "react-router-dom";

function useURLPos() {
  // navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  // After ? it is the query string that can be accessed by usesearchparams()
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}

export default useURLPos;
