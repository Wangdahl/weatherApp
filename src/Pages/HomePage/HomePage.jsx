import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../../redux/weatherSlice";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CurrentWeather from "../../Components/CurrentWeather/CurrentWeather";
import ForecastList from "../../Components/ForecastList/ForecastList";
import Spinner from "../../Components/Spinner/Spinner";
import "./HomePage.css";

function HomePage() {
    const dispatch = useDispatch();
    const weatherState = useSelector((state) => state.weather);
    const { current, daily, status, error, lastQuery } = weatherState;

    // Handler for search
    const handleSearch = (query) => {
        if (!query) return;
        dispatch(fetchWeatherData(query));
    };

    return (
        <main className="homepage">
        <SearchBar onSearch={handleSearch} />

        {/* Display spinner if loading */}
        {status === "loading" && <Spinner />}

        {/* Display error message if error */}
        {status === "failed" && error && <p className="error-message">{error}</p>}

        {/* Display current weather if available */}
        {current && status !== "loading" && <CurrentWeather data={current} />}

        {/* Display 5-day forecast if available */}
        {daily && daily.length > 0 && status !== "loading" && (
            <ForecastList days={daily} />
        )}
        </main>
    );
}

export default HomePage;
