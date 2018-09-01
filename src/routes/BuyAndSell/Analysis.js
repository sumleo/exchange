import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Button,
  Input,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
import ChartComponent from './index';
import styles from './Analysis.less';
import { Tab } from '../../components/Login';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const Yuan = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: yuan(children) }} /* eslint-disable-line react/no-danger */
  />
);

@connect(({ chart, loading,login,option }) => ({
  chart,login,option,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
    dispatch({
      type:'option/getPage',
      payload:{token:this.props.login.token},
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };

    const topChartResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 10,
      style: { marginBottom: 24 },
    };

    const topRightResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const OptionCard=(e)=>{
      let keys=Object.keys(e);
      return (<Card>
        {keys.map((item)=>(<div><span>{item} :</span><span>{e[item]}</span></div>))}
      </Card>)
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
              >
                <h3>List Options</h3>
                <Row>
                  <Col span={6} >
                    <Button type="primary">Open</Button>
                  </Col>
                  <Col span={8} offset={1}>
                    <Button type="primary">Brought</Button>
                  </Col>
                  <Col span={6} offset={1}>
                    <Button type="primary">Ended</Button>
                  </Col>
                </Row>
                <Table />
                <h3 style={{marginTop:32}}>Total Number: 1</h3>
                {this.props.option.list.map((e)=>OptionCard(e))}
              </ChartCard>
          </Col>
          <Col {...topChartResponsiveProps}>
            <ChartCard
              bordered={false}
            >
              <ChartComponent />
            </ChartCard>
          </Col>
          <Col {...topRightResponsiveProps}>
            <ChartCard
              bordered={false}
            >
              <Row style={{marginTop:32}}>
                <Col span={10}>
                  <Input placeholder="请输入数量" />
                </Col>
                <Col offset={1} span={3}>
                  <Button style={{color:"green"}}>Sell</Button>
                </Col>
              </Row>
              <Row style={{marginTop:32}}>
                <Col span={10}>
                  <Input placeholder="请输入数量" />
                </Col>
                <Col offset={1} span={3}>
                  <Button style={{color:"red"}}>Buy</Button>
                </Col>
              </Row>
            </ChartCard>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
