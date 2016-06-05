import React from 'react';
import { connect} from 'react-redux';

import Menu from './Menu';
import About from './About';

import Bubble from './sort/Bubble';
import Insertion from './sort/Insertion';
import Merge from './sort/Merge';
import Quick from './sort/Quick';
import Radix from './sort/Radix';
import Selection from './sort/Selection';
import Shell from './sort/Shell';


import 'stylesheets/Appmain.scss';

class Appmain extends React.Component {
  constructor (props) {
    super(props);
  }

  aboutOrNot (sortType) {
    switch (sortType) {
      case 'Bubble':
        return <Bubble />
      case 'Insertion':
        return <Insertion />
      case 'Merge':
        return <Merge />
      case 'Quick':
        return <Quick />
      case 'Radix':
        return <Radix />
      case 'Selection':
        return <Selection />
      case 'Shell':
        return <Shell />
      default:
        return <About />
    }
  }

  render () {
    let { sortType } = this.props;
    return (
      <div className="row" id="Appmain">
        <div className="col s2">
          <Menu sortType={sortType}/>
        </div>
        <div className="col s10">
          <div className="card"> 
            <div className="card-content">
              { this.aboutOrNot(sortType) }
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({sortType}) => {
  return {
    sortType
  }
};

export default connect(mapStateToProps)(Appmain);
