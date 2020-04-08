import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGlobalData } from '../actions';
import CovidTable from '../components/CovidTable';
import Hero from '../components/Hero';
import GlobalCovidCounter from '../components/GlobalCovidCounter';
import GlobalCovidMap from '../components/GlobalCovidMap';
import SeachCountryTile from '../components/SearchCountryTile';
import CovidTimeSeriesGraph from '../components/CovidTimeSeriesGraph';
import CountrywiseTimeSeriesGraph from '../components/CountrywiseTimeSeriesGraph';
import Notification from '../components/Notification';

function Home(props) {
  
  useEffect(() => {
    if(Object.keys(props.globalCovid).length === 0 || Object.keys(props.countrywiseCovid).length === 0) {
      props.getGlobalData();
    }
  }, []);

  return (
    <div>
      <Notification content={<span><strong>India Covid-19 Information</strong> is available now in detail.</span>} type='primary' linkTitle='Visit Here' link='/india'/>
      <Hero type='link' title='Global Information' subtitle='Daily Updates, Facts and Analysis' date={props.globalCovid.date}/>
      <div className="container is-fluid" style={{marginTop: 20}}>
        <GlobalCovidCounter/>
        <GlobalCovidMap/>
      </div>
      <div className="container">
        <CovidTimeSeriesGraph covidTimeSeries={props.globalCovidTimeSeries} covidTimeSeriesDelta={props.globalCovidDailyDelta} title='Global Charts'/>
      </div>
      <Hero type='info' title='Country-wise Information' subtitle='Daily Updates, Facts and Analysis' date={props.globalCovid.date}/>
      <div style={{marginTop: 40}} className="container is-fluid">
        <SeachCountryTile />
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <div style={{marginBottom: 20}}>
              <Notification content={<span><strong>Tip: </strong>Click or Tap on row to view detailed situation in individual countries.</span>} type='success'/>
            </div>
            {props.countrywiseCovid.length !== 0 ?
            <CovidTable data={props.countrywiseCovid} headerColumn='Country/Region' headerAccessor='country' isGlobalTable/>
            :
            null}
          </div>
        </div>
      </div>
      <div className="container">
        <CountrywiseTimeSeriesGraph />
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {globalCovid: state.globalCovid, countrywiseCovid: state.countrywiseCovid, globalCovidDailyDelta: state.globalCovidDailyDelta, globalCovidTimeSeries: state.globalCovidTimeSeries};
}

export default connect(mapStateToProps, { getGlobalData })(Home);