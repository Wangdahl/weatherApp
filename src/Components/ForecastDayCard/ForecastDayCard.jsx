import { WiCloud, WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiWindy } from "react-icons/wi";
import './ForecastDayCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function ForecastDayCard({ day, onClick }) {
    // day contains: date, tempMin, tempMax, windSpeed, weatherCode
    const dateObj = new Date(day.date);
    const options = { weekday: "short", month: "short", day: "numeric" };
    const dateStr = dateObj.toLocaleDateString(undefined, options);

    // Choose an icon based on weather code
    let icon = <WiDaySunny />;
    if (day.weatherCode >= 2000 && day.weatherCode < 3000) {
        icon = <WiCloud />;
    } else if (day.weatherCode >= 3000 && day.weatherCode < 4000) {
        icon = <WiCloud />;
    } else if (day.weatherCode >= 4000 && day.weatherCode < 5000) {
        icon = <WiRain />;
    } else if (day.weatherCode >= 5000 && day.weatherCode < 6000) {
        icon = <WiSnow />;
    } else if (day.weatherCode >= 8000) {
        icon = <WiThunderstorm />;
    } else if (day.weatherCode === 1001) {
        icon = <WiCloud />;
    }

    return (
        <div className="forecast-day-card" onClick={onClick}>
            <h4>{dateStr}</h4>
            <div className="icon">{icon}</div>
            <div className="temp-range">
                <span>{Math.round(day.tempMax)}°C</span> / <span>{Math.round(day.tempMin)}°C</span>
            </div>
            <div className="wind">
                <WiWindy /> {Math.round(day.windSpeed)} m/s
            </div>
            <div className="hourly">
                <span className="hourlySpan">HOURLY VIEW</span>
                <FontAwesomeIcon className="moving-arrow" icon={faAngleRight} />
            </div>
            <div className="divider"></div>
        </div>
    );
}

export default ForecastDayCard;
