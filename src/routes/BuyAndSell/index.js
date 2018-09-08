
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";
import { connect } from 'dva/index';

@connect(({ option }) => ({
  option,
}))
class ChartComponent extends React.Component {
  componentDidMount() {
    const {dispatch}=this.props;
    setInterval(()=>(dispatch({
      type:'option/getKLine',
    }).then(()=>{
      const {option}=this.props;
      const {ts=0}=option;
      const data=[];
      option.data.map((e)=>{
        const result={
          absoluteChange:undefined,
          dividend:"",
          percentChange:undefined,
          split:"",
        };
        const {close,open,high,low,vol:volume} =e;
        const date=new Date(ts);
        result.date=date;
        result.close=close;
        result.open=open;
        result.high=high;
        result.low=low;
        result.volume=volume;
        data.push(result);
        return null;
      });
      this.setState({data});
    })),60000);
    // getData().then(data => {
    //   this.setState({ data })
    // })
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>
    }
    return (
      <TypeChooser>
        {type => <Chart type={type} data={this.state.data} />}
      </TypeChooser>
    )
  }
}

export default ChartComponent;
