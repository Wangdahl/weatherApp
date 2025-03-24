import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Defining an async thunk to fetch weather data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async(locationQuery, { rejectWithValue }) => {
        try {
            const apiKey = import.meta.env.VITE_TOMORROW_API_KEY;
            //Constructing the URL
            const baseUrl = 'https://api.tomorrow.io/v4/weather';
            const params = `location=${encodeURIComponent(locationQuery)}&units=metric&apikey=${apiKey}`;
            
            //Fetch current weather
            const currentRes = await fetch(`${baseUrl}/realtime?${params}`);
            const currentData = await currentRes.json();
            //Fetch 5 day forecast
            const forecastRes = await fetch(`${baseUrl}/forecast=${params}`);
            const forecastData = await forecastRes.json();
            //Fetch weather alerts
            const alertsRes = await fetch(`${baseUrl}/alerts=${params}`);
            const alertsData = await alertsRes.json();

            const current = {
                temp: currentData.data.values.temperature, //Current temperature
                windSpeed: currentData.data.values.windSpeed, //Current wind speed
                weatherCode: currentData.data.values.weatherCode, //Current weather code
                cityName: currentData.data.location.name //resolved location
            }

            //Parse forecast daily data 
            //Tomorrow.io returns an array of daily intervals, we are interested in the first five
            let daily = [];
            if(forecastData.data && forecastData.data.timelines) {
                const dailyIntervals = forecastData.data.timelines[0].intervals;
                daily = dailyIntervals.slice(0, 5).map(intervals => ({
                    date: intervals.startTime,
                    tempMin: intervals.values.temperatureMin,
                    tempMax: intervals.values.temperatureMax,
                    windSpeed: intervals.values.windSpeed,
                    weatherCode: intervals.values.weatherCode
                }));
            } else if (forecastData && forecastData.data.values) {
                //If the API returns a simplified format
                daily = forecastData.data.values.slice(0, 5);
            }

            //Parse alerts data
            let alerts = [];
            if(alertsData.data) {
                if(Array.isArray(alertsData.data)) {
                    alerts = alertsData.data;
                } else if(alertsData.data.events) {
                    alerts = alertsData.data.events;
                } else {
                    alerts = alertsData.data;
                }
            }

            return { current, daily, alerts };
        } catch (err) {
            // If any fetch fails or JSON parsing fails, we handle errors here
            console.error('Error fetching weather data:', err);
            return rejectWithValue('Failed to fetch weather data. Please try again.')
        }
    }
);
//Fetching hourly data for given location and date range
export const fetchHourlyData = createAsyncThunk(
    'weather/fetchHourlyData',
    async({ locationQuery, date }, { rejectWithValue }) => {
        try {
            const apiKey = import.meta.env.VITE_TOMORROW_API_KEY;
            const baseUrl = 'https://api.tomorrow.io/v4/weather';

            // Fetching data for 24 hours from the given date
            const startTimeISO = new Date(date).toISOString();
            const endTimeISO = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString();
            const params = `location=${encodeURIComponent(locationQuery)}&units=metric&apikey=${apiKey}&timesteps=1h&startTime=${startTimeISO}&endTime=${endTimeISO}`;
            const response = await fetch(`${baseUrl}/forecast?${params}`);
            const data = await response.json();
            let hourly = [];
            if(data.data && data.data.timelines) {
                const hourlyIntervals = data.data.timelines[0].intervals;
                hourly = hourlyIntervals.map(intervals => ({
                    time: intervals.startTime,
                    temp: intervals.values.temperature,
                    windSpeed: intervals.values.windSpeed,
                    weatherCode: intervals.values.weatherCode
                }));
            }
            return hourly
        } catch (err) {
            console.error('Error fetching hourly data:', err);
            return rejectWithValue('Failed to fetch hourly data.');
        }
    }
)


const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        current: null,
        daily: [],
        alerts: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
        lastQuery: '', // store the last searched location query
        hourly: [],
        hourlyStatus: 'idle',
        hourlyError: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.current = action.payload.current;
                state.daily = action.payload.daily;
                state.alerts = action.payload.alerts;
                state.lastQuery = action.meta.arg; //Location we fetched data for
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Unable to fetch data';
            })
            .addCase(fetchHourlyData.pending, (state) => {
                state.hourlyStatus = 'loading';
                state.hourlyError = null;
            })
            .addCase(fetchHourlyData.fulfilled, (state, action) => {
                state.hourlyStatus = 'succeeded';
                state.hourly = action.payload;
            })
            .addCase(fetchHourlyData.rejected, (state, action) => {
                state.hourlyStatus = 'failed';
                state.hourlyError = action.payload || 'Unable to fetch hourly data';
            })
    }
});

export default weatherSlice.reducer;