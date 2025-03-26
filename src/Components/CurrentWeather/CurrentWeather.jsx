import { useNavigate } from "react-router-dom";
import { WiWindy, WiThermometer, WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './CurrentWeather.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function CurrentWeather({ data }) {
    const navigate = useNavigate();

    const handleDayClick = (index) => {
        // Navigate to detail page for the day
        navigate(`/forecast/${index}`);
    };
    if(!data) return null;
    const { temp, windSpeed, weatherCode, cityName } = data;

    let weatherIcon = <WiDaySunny />;
    let weatherDescription = 'Clear';
    if (weatherCode >= 2000 && weatherCode < 3000) {
        weatherIcon = <WiCloud />;
        weatherDescription = 'Fog';
    } else if (weatherCode >= 3000 && weatherCode < 4000) {
        weatherIcon = <WiRain />;
        weatherDescription = 'Cloudy';
    } else if (weatherCode >= 4000 && weatherCode < 5000) {
        weatherIcon = <WiRain />;
        weatherDescription = 'Rain';
    } else if (weatherCode >= 5000 && weatherCode < 6000) {
        weatherIcon = <WiSnow />;
        weatherDescription = 'Snow';
    } else if (weatherCode >= 8000) {
        weatherIcon = <WiThunderstorm />;
        weatherDescription = 'Thunderstorm';
    } else if (weatherCode === 1001) {
        weatherIcon = <WiCloud />;
        weatherDescription = 'Cloudy';
    } else if (weatherCode > 1000 && weatherCode < 1100) {
        weatherIcon = <WiDaySunny />;
        weatherDescription = 'Mostly Clear';
    }

    return (
        <section className='current-weather' onClick={() => handleDayClick(0)}>
            <h2>{cityName}</h2>
            <div className='current-temp'>
                <WiThermometer />
                <span>{Math.round(temp)}°C</span>
            </div>
            <p>{weatherIcon}{weatherDescription}</p>
            <p id="wind-p"><WiWindy /> {Math.round(windSpeed)} m/s</p>
            <div className="hourly">
                <span className="hourlySpan">HOURLY VIEW</span>
                <FontAwesomeIcon className="moving-arrow" icon={faAngleRight} />
            </div>
        </section>
    )

}
export default CurrentWeather;
