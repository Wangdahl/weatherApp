import { WiCloud, WiDaySunny, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

function ForecastDayCard ({ day, index, onClick }) {
    // day contains date, tempMin, tempMax, windSpeed, weatherCode
    const dateObj = new Date(day.date);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateStr = dateObj.toLocalDateString(undefined, options);

      // Choose an icon similar to CurrentWeather logic
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
        <div className='fprecast-day-card' onClick={onClick}>
            <h4>{dateStr}</h4>
            <div className='icon'>{icon}</div>
            <div className='tempp-range'>
                <span>{Math.round(day.tempMax)}°C</span> / <span>{Math.round(day.tempMin)}°C</span>
            </div>
            <div className='wind'><WiWindy /> {Math.round(day.windSpeed)} m/s</div>
        </div>
    );
}

export default ForecastDayCard;