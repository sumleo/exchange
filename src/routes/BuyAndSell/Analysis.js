import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Tabs,
  Table,
  DatePicker,
  Button,
  Form,Input,
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
@Form.create()
export default class Analysis extends Component {
  state = {
    list:[],
    optDetail:{},
    long:"",
    short:"",
  };

  componentDidMount() {
    const { dispatch,option} = this.props;
    const {list=[]}=option;
    dispatch({
      type: 'chart/fetch',
    });
    dispatch({
      type:'option/getPage',
      payload:{token:this.props.login.token},
    });
    dispatch({
      type:"option/getKLine",
    })
  }


  handleViewDetail=(e,id)=>{
    e.preventDefault();
    const {option}=this.props;
    const {list}=option;
    let target={};
    list.map((e)=>{
      console.log(e,id);
      if(e.optID===id){
          target=e;
      }
    });
    this.setState({
      optDetail:target,
    })
  };

  handleBuyLong=()=>{
    const {form,dispatch,login} =this.props;
    const {token=""}=login;
    const {optDetail} =this.state;
    const {optID}=optDetail;
    const numBet=parseFloat(form.getFieldValue("long")||"");
    const hacAddress="";
    dispatch({
      type:"option/buyLong",
      payload:{numBet,hacAddress,optID,token},
    });
  };

  handleBuyShort=()=>{
    const {form,dispatch,login} =this.props;
    const {token=""}=login;
    const {optDetail} =this.state;
    const {optID}=optDetail;
    const numBet=parseFloat(form.getFieldValue("short")||"");
    const hacAddress="";
    dispatch({
      type:"option/buyShort",
      payload:{numBet,hacAddress,optID,token},
    });
  };

  render() {
    const {form} =this.props;
    const {getFieldDecorator}=form;
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
      xl: 16,
      style: { marginBottom: 24 },
    };

    const OptionCard=(e)=>{
      return (<Card>
        <div><span> ID : {e.optID}</span><span> Coin : {e.coin}</span><span> Start Time : {new Date(e.startTime).toLocaleString()}</span></div>
        <Button type="primary" onClick={(evt)=>this.handleViewDetail(evt,e.optID)} >View</Button>
      </Card>);
    };

      const {optDetail:target={}}=this.state;
      const keys=Object.keys(target);


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
                <h3 style={{marginTop:32}}>Total Number: {this.props.option.count||0}</h3>
                {this.props.option.list.map((e)=>OptionCard(e))}
              </ChartCard>
          </Col>
          <Col {...topRightResponsiveProps}>
            <ChartCard
              bordered={false}
            >
              <ChartComponent />
            </ChartCard>
            {keys.length?(
              <Card>
                <Row>
                  <Col span={16}>
                    {keys.map(e=>(<div>{`${e} : ${target[e]}`}</div>))}
                  </Col>
                  <Col span={8}>
                    <Form>
                      <Form.Item>
                        {
                          getFieldDecorator('long')(<Input />)
                        }
                        <Button type="primary" onClick={this.handleBuyLong}>Buy Long</Button>
                      </Form.Item>
                      <Form.Item>
                        {
                          getFieldDecorator('short')(<Input />)
                        }
                        <Button type="primary" onClick={this.handleBuyShort}>Buy Short</Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Card>):""}
          </Col>
          {/*<Col {...topRightResponsiveProps}>*/}
            {/*<ChartCard*/}
              {/*bordered={false}*/}
            {/*>*/}
              {/*<Row style={{marginTop:32}}>*/}
                {/*<Col span={10}>*/}
                  {/*<Input placeholder="请输入数量" />*/}
                {/*</Col>*/}
                {/*<Col offset={1} span={3}>*/}
                  {/*<Button style={{color:"green"}}>Sell</Button>*/}
                {/*</Col>*/}
              {/*</Row>*/}
              {/*<Row style={{marginTop:32}}>*/}
                {/*<Col span={10}>*/}
                  {/*<Input placeholder="请输入数量" />*/}
                {/*</Col>*/}
                {/*<Col offset={1} span={3}>*/}
                  {/*<Button style={{color:"red"}}>Buy</Button>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</ChartCard>*/}
          {/*</Col>*/}
        </Row>
      </Fragment>
    );
  }
}
