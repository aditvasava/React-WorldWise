import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { useCities } from "../contexts/citiescontext";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // const x = useParams()
  // console.log(x) => {id: '384348533'}
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { cityName, emoji, date, notes } = currentCity;

  /*
   localhost:3000/app/cities/34532?lat=23.3232&lng=43.2345
   After the question mark. Similar to req.query of node js
   const [searchParams, setSearchParams] = useSearchParams();
   const lat = searchParams.get("lat");
   const lng = searchParams.get("lng");
   Updating the searchparams or query string is a global thing, all the components that are reading this or using this will get updated
   Over here the use case is to click anywhere on the map and get the coordinates from the click, update query string and pass it to the form component.
  */
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
