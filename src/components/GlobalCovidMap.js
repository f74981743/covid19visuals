import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ResponsiveChoropleth } from '@nivo/geo';
import features from '../data/mapData';

function GlobalCovidMap(props) {
  
  const [type, setType] = useState('confirmed');
  const [domain, setDomain] = useState(100000);
  const [colors, setColors] = useState('oranges')

  const domainMap = {
    confirmed: 100000,
    active: 100000,
    deaths: 10000,
    recovered: 50000
  }

  const colorsMap = {
    confirmed: 'oranges',
    active: 'oranges',
    deaths: 'reds',
    recovered: 'greens'
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setDomain(domainMap[e.target.value]);
    setColors(colorsMap[e.target.value]);
  }

  return (
    <div className="has-text-centered" style={{marginBottom: 40, marginTop: 20}}>
      <span class="select">
        <select onChange={handleTypeChange}>
          <option value='confirmed' selected={'confirmed' === type}>Confirmed</option>
          <option value='active' selected={'active' === type}>Active</option>
          <option value='deaths' selected={'deaths' === type}>Deaths</option>
          <option value='recovered' selected={'recovered' === type}>Recovered</option>
        </select>
      </span>
      {props.countrywiseCovid.length !== 0 ?
      <div>
        <div className="is-hidden-mobile" style={{height: '50vh', marginTop: 20}}>
          <ResponsiveChoropleth
            data={props.countrywiseCovid}
            features={features}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            colors={colors}
            domain={[ 0, domain ]}
            unknownColor="#ffffff"
            label="properties.name"
            value={type}
            valueFormat=".2s"
            projectionTranslation={[ 0.5, 0.5 ]}
            projectionRotation={[ 0, 0, 0 ]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            projectionScale={120}
          />
        </div>
        <div className="is-hidden-tablet" style={{height: '40vh'}}>
          <ResponsiveChoropleth
            data={props.countrywiseCovid}
            features={features}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            colors={colors}
            domain={[ 0, domain ]}
            unknownColor="#ffffff"
            label="properties.name"
            value={type}
            valueFormat=".2s"
            projectionTranslation={[ 0.4, 0.5 ]}
            projectionRotation={[ 0, 0, 0 ]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            projectionScale={55}
          />
        </div>
      </div>
      :
      null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {countrywiseCovid: state.countrywiseCovid};
}

export default connect(mapStateToProps)(GlobalCovidMap);