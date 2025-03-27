import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHourlyData } from "../../redux/weatherSlice";
import Spinner from "../../Components/Spinner/Spinner";
import { WiCloud, WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiWindy } from "react-icons/wi";
import './ForecastDetails.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

function ForecastDetailPage() {
    // Convert dayIndex from the URL parameter to a number
    const { dayIndex } = useParams();
    const index = parseInt(dayIndex, 10);
    const dispatch = useDispatch();
    const { daily, hourly, hourlyStatus, hourlyError, lastQuery } = useSelector(
        (state) => state.weather
    );

    // Determine the date for the selected day using the numeric index
    const selectedDay = daily[index];

    useEffect(() => {
        if (selectedDay && lastQuery) {
        // Fetch hourly data for this day if not already loading or loaded
        dispatch(fetchHourlyData({ locationQuery: lastQuery, date: selectedDay.date }));
        }
    }, [dispatch, selectedDay, lastQuery]);

    if (!selectedDay) {
        return <p>Day not found. Please go back to the forecast.</p>;
    }

    return (
        <section className="forecast-detail">
        <h1>
            Hourly Forecast
        </h1>
        <div className="link-box">
            <Link to="/" className="back-link">
                <FontAwesomeIcon className="move-back" id="backI" icon={faAngleLeft}/>
            </Link>
            <p>Back to 5-day forecast</p>
        </div>
        {/* If loading, display spinner */}
        {hourlyStatus === "loading" && <Spinner />}
        {/* If failed, display error message */}
        {hourlyStatus === "failed" && <p className="error-message">{hourlyError}</p>}
        {/* If succeeded and hourly data exists, render the hourly forecast */}
        {hourlyStatus === "succeeded" && hourly && hourly.length > 0 && (
            <div className="hourly-list">
                <p className="date">{" "}
                    {new Date(selectedDay.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    })}
                </p>
                {hourly.map((hourData, idx) => {
                    const timeStr = new Date(hourData.time).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    });
                    let icon = <WiDaySunny />;
                    if (hourData.weatherCode >= 2000 && hourData.weatherCode < 3000)
                    icon = <WiCloud />;
                    else if (hourData.weatherCode >= 3000 && hourData.weatherCode < 4000)
                    icon = <WiCloud />;
                    else if (hourData.weatherCode >= 4000 && hourData.weatherCode < 5000)
                    icon = <WiRain />;
                    else if (hourData.weatherCode >= 5000 && hourData.weatherCode < 6000)
                    icon = <WiSnow />;
                    else if (hourData.weatherCode >= 8000)
                    icon = <WiThunderstorm />;
                    else if (hourData.weatherCode === 1001)
                    icon = <WiCloud />;

                    return (
                    <div key={idx} className="hour-row">
                        <span className="hour">{timeStr}</span>
                        <span className="hour-icon">{icon}</span>
                        <span className="hour-temp">{Math.round(hourData.temp)}°C</span>
                        <span className="hour-wind">
                        <WiWindy /> {Math.round(hourData.windSpeed)} m/s
                        </span>
                    </div>
                    );
                })}
            </div>
        )}
        <div className="link-box">
            <Link to="/" className="back-link">
                <FontAwesomeIcon className="move-back" id="backI" icon={faAngleLeft}/>
            </Link>
            <p>Back to 5-day forecast</p>
        </div>
        </section>
    );
}

export default ForecastDetailPage;
