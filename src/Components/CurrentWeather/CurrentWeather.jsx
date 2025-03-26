import { WiWindy, WiThermometer, WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import './CurrentWeather.css'

function CurrentWeather({ data }) {
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
        <section className='current-weather'>
            <h2>{cityName}</h2>
            <div className='current-temp'>
                {weatherIcon}
                <span>{Math.round(temp)}°C</span>
            </div>
            <p>{weatherDescription}</p>
            <p><WiWindy /> Wind: {Math.round(windSpeed)} m/s</p>
        </section>
    )

}
export default CurrentWeather;
