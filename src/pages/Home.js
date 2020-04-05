import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGlobalData } from '../actions';
import CovidTable from '../components/CountryTable';
import Hero from '../components/Hero';
import GlobalCovidCounter from '../components/GlobalCovidCounter';
import GlobalCovidMap from '../components/GlobalCovidMap';
import SeachCountryTile from '../components/SearchCountryTile';
import GlobalTimeSeriesGraph from '../components/GlobalTimeSeriesGraph';

function Home(props) {
  
  useEffect(() => {
    if(Object.keys(props.globalCovid).length === 0 || Object.keys(props.countrywiseCovid).length === 0) {
      props.getGlobalData();
    }
  }, []);

  return (
    <div>
      <Hero type='link' title='Global Information' subtitle='More Information is coming soon' date={props.globalCovid.date}/>
      <div className="container is-fluid" style={{marginTop: 20}}>
        <GlobalCovidCounter/>
        <GlobalCovidMap/>
      </div>
      <div className="container">
        <GlobalTimeSeriesGraph />
      </div>
      <Hero type='info' title='Country-wise Information' subtitle='More information is coming soon' date={props.globalCovid.date}/>
      <div style={{marginTop: 40}} className="container is-fluid">
        <SeachCountryTile />
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            {props.countrywiseCovid.length !== 0 ?
            <CovidTable data={props.countrywiseCovid}/>
            :
            null}
          </div>
        </div>
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {globalCovid: state.globalCovid, countrywiseCovid: state.countrywiseCovid};
}

export default connect(mapStateToProps, { getGlobalData })(Home);