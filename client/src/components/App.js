import React, { Component } from 'react';
import './styles/App.css';
import FinancialStat from './FinancialStat';
import Greetings from './Greetings';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Greetings username={'demoUser123'} />
        <FinancialStat description={'Income This Month: '} value={2000}/>
        <FinancialStat description={'Expenses This Month: '} value={500}/>
        <FinancialStat description={'Net Income This Month: '} value={1500}/>
        <FinancialStat description={'Goal For The Month: '} value={750}/>
      </div>
    );
  }
}

export default App;