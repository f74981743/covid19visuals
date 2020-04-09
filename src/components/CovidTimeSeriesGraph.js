import React, { useState, useEffect } from 'react';
import {LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import *  as d3f from 'd3-format';
import PropTypes from 'prop-types'; 

export default function CovidTimeSeriesGraph(props) {

  const [type, setType] = useState('confirmed');
  const [duration, setDuration] = useState('all');
  const [timeseries, setTimeseries] = useState(props.covidTimeSeries);
  const [deltaseries, setDeltaseries] = useState(props.covidTimeSeriesDelta);
  const [curveAnalysis, setCurveAnalysis] = useState({});

  useEffect(() => {
    setTimeseries(props.covidTimeSeries);
    setDeltaseries(props.covidTimeSeriesDelta);
    analyseCurve(props.covidTimeSeries, props.covidTimeSeriesDelta);
  }, [props.covidTimeSeries, props.covidTimeSeriesDelta]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleDurationChange = (d) => {
    setDuration(d);
    if(d === 'all') {
      setTimeseries(props.covidTimeSeries);
      setDeltaseries(props.covidTimeSeriesDelta);
    }
    else if(d === '1m') {
      setTimeseries(props.covidTimeSeries.slice(Math.max(props.covidTimeSeries.length - 30, 0)));
      setDeltaseries(props.covidTimeSeriesDelta.slice(Math.max(props.covidTimeSeriesDelta.length - 30, 0)));
    }
    else {
      setTimeseries(props.covidTimeSeries.slice(Math.max(props.covidTimeSeries.length - 15, 0)));
      setDeltaseries(props.covidTimeSeriesDelta.slice(Math.max(props.covidTimeSeriesDelta.length - 15, 0)));
    }
  }

  const analyseCurve = (timeseriesData, deltaseriesData) => {
    const result = {};
    if(timeseriesData && Array.isArray(timeseriesData) && timeseriesData.length !== 0) {
      console.log(timeseriesData);
      const num7Inf = timeseriesData[timeseriesData.length-1-7].confirmed;
      const num15Inf = timeseriesData[timeseriesData.length-1-15].confirmed;
      const num30Inf = timeseriesData[timeseriesData.length-1-30].confirmed;
      const curInf = timeseriesData[timeseriesData.length-1].confirmed;
      console.log(num30Inf, num15Inf, num7Inf, curInf);
      result.ratio7 = (curInf/num7Inf).toFixed(2);
      result.ratio15 = (curInf/num15Inf).toFixed(2);
      result.ratio30 = (curInf/num30Inf).toFixed(2);
    }
    setCurveAnalysis(result);
  }

  const colorMap = {
    confirmed: '#8884d8',
    active: '#8884d8',
    recovered: '#82ca9d',
    deaths: '#ff7300'
  }

  return (
    <div style={{marginBottom: 40}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
        <p className="title is-4"  style={{paddingTop: 7}}>{props.title}</p>
        <div className="has-text-centered" style={{marginBottom: 20}}>
          <span class="select">
            <select onChange={handleTypeChange}>
              <option value='confirmed' selected={'confirmed' === type}>Confirmed</option>
              <option value='active' selected={'active' === type}>Active</option>
              <option value='deaths' selected={'deaths' === type}>Deaths</option>
              <option value='recovered' selected={'recovered' === type}>Recovered</option>
            </select>
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={timeseries} margin={{top: 0, right: 20, left: 0, bottom: 0}}>
              <XAxis dataKey="date" tickFormatter={(v) => v.substring(5)}/>
              <YAxis tickFormatter={(v) => d3f.format('.2s')(v)}/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Line type="monotone" dataKey={type} stroke={colorMap[type]} strokeWidth={2} dot={false} fillOpacity={0} activeDot={{r: 5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="column">
          <ResponsiveContainer width='100%' height={200}>
            <BarChart data={deltaseries} margin={{top: 0, right: 20, left: 0, bottom: 0}}>
              <XAxis dataKey="date" tickFormatter={(v) => v.substring(5)}/>
              <YAxis tickFormatter={(v) => d3f.format('.2s')(v)}/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Bar dataKey={type} fill={colorMap[type]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
        <div></div>
        <div class="buttons has-addons">
          <button class={`button is-small ${duration === 'all' ? 'is-dark is-selected' : ''}`} onClick={() => handleDurationChange('all')}>All</button>
          <button class={`button is-small ${duration === '1m' ? 'is-dark is-selected' : ''}`} onClick={() => handleDurationChange('1m')}>1M</button>
          <button class={`button is-small ${duration === '15d' ? 'is-dark is-selected' : ''}`} onClick={() => handleDurationChange('15d')}>15D</button>
        </div>
      </div>
      <div style={{margin: 20, padding: 20}} className="card notification is-dark is-light">
        <p className="title is-5">Curve Analysis</p>
        <p>In last 7 days, number of infected people have increased {curveAnalysis.ratio7} times.</p>
        <p>In last 15 days, number of infected people have increased {curveAnalysis.ratio15} times.</p>
        <p>In last 30 days, number of infected people have increased {curveAnalysis.ratio30} times.</p>
      </div>
    </div>
  )
}

CovidTimeSeriesGraph.propTypes = {
  covidTimeSeries: PropTypes.array,
  covidTimeSeriesDelta: PropTypes.array,
  title: PropTypes.string
}