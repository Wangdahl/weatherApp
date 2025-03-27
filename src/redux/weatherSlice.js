import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = import.meta.env.VITE_TOMORROW_API_KEY;
const timelinesUrl = `https://api.tomorrow.io/v4/timelines?apikey=${apiKey}`;

// Async thunk for fetching realtime weather and daily forecast
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (locationQuery, { rejectWithValue }) => {
        try {
        // --- Realtime Data (Current) ---
        const now = new Date();
        // Create a 1-minute window for the "current" timestep
        const oneMinuteLater = new Date(now.getTime() + 60 * 1000).toISOString();
        const realtimeBody = {
            location: locationQuery, // e.g., "New York, United States"
            fields: ["temperature", "windSpeed", "weatherCode"],
            timesteps: ["current"],
            units: "metric",
            startTime: now.toISOString(),
            endTime: oneMinuteLater
        };

        const realtimeRes = await fetch(timelinesUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(realtimeBody)
        });
        if (!realtimeRes.ok) {
            const errorText = await realtimeRes.text();
            throw new Error(`Realtime error: ${realtimeRes.status} - ${errorText}`);
        }
        const realtimeData = await realtimeRes.json();

        // --- Daily Forecast Data (4-day forecast due to plan restriction) ---
        const startTime = new Date().toISOString();
        // Use 4 days ahead instead of 5 to avoid the Forbidden error.
        const endTime = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
        const dailyBody = {
            location: locationQuery,
            fields: ["temperatureMin", "temperatureMax", "windSpeed", "weatherCode"],
            timesteps: ["1d"],
            units: "metric",
            startTime,
            endTime
        };

        const dailyRes = await fetch(timelinesUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dailyBody)
        });
        if (!dailyRes.ok) {
            const errorText = await dailyRes.text();
            throw new Error(`Daily forecast error: ${dailyRes.status} - ${errorText}`);
        }
        const dailyData = await dailyRes.json();

        // --- Extracting Realtime Data ---
        const realtimeTimeline = realtimeData.data.timelines[0];
        const realtimeInterval = realtimeTimeline.intervals[0];
        const currentValues = realtimeInterval.values;

        const current = {
            temp: currentValues.temperature,
            windSpeed: currentValues.windSpeed,
            weatherCode: currentValues.weatherCode,
            cityName: realtimeData.location?.name || locationQuery
        };

        // --- Extracting Daily Forecast Data ---
        const dailyTimeline = dailyData.data.timelines[0];
        const daily = dailyTimeline.intervals.map(interval => ({
            date: interval.startTime,
            tempMin: interval.values.temperatureMin,
            tempMax: interval.values.temperatureMax,
            windSpeed: interval.values.windSpeed,
            weatherCode: interval.values.weatherCode
        }));

        return { current, daily };
        } catch (err) {
        console.error('Error fetching weather data:', err);
        return rejectWithValue('Failed to fetch weather data. Please try again.');
        }
    }
);

// Async thunk for fetching hourly forecast data for a given date (24-hour period)
export const fetchHourlyData = createAsyncThunk(
    'weather/fetchHourlyData',
    async ({ locationQuery, date }, { rejectWithValue }) => {
        try {
        // Construct the target date at midnight
        const targetDate = new Date(date);
        const startTimeDate = new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate(),
            0, 0, 0
        );
        // Set endTime to the next day at midnight.
        const endTimeDate = new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate(),
            23, 0, 0
        );
        const startTime = startTimeDate.toISOString();
        const endTime = endTimeDate.toISOString();        
        const hourlyBody = {
            location: locationQuery,
            fields: ["temperature", "windSpeed", "weatherCode"],
            timesteps: ["1h"],
            units: "metric",
            startTime,
            endTime
        };

        const hourlyRes = await fetch(timelinesUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hourlyBody)
        });
        if (!hourlyRes.ok) {
            const errorText = await hourlyRes.text();
            throw new Error(`Hourly forecast error: ${hourlyRes.status} - ${errorText}`);
        }
        const hourlyData = await hourlyRes.json();
        const hourlyTimeline = hourlyData.data.timelines[0];
        const hourly = hourlyTimeline.intervals.map(interval => ({
            time: interval.startTime,
            temp: interval.values.temperature,
            windSpeed: interval.values.windSpeed,
            weatherCode: interval.values.weatherCode
        }));
        return hourly;
        } catch (err) {
        console.error('Error fetching hourly data:', err);
        return rejectWithValue('Failed to fetch hourly data.');
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        current: null,
        daily: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
        lastQuery: '', // store the last searched location query
        hourly: [],
        hourlyStatus: 'idle',
        hourlyError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeatherData.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.current = action.payload.current;
            state.daily = action.payload.daily;
            state.lastQuery = action.meta.arg;
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
        });
    }
});

export default weatherSlice.reducer;
