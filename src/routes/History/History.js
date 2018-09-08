import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Table,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ history,login }) => ({
  history,login,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  componentDidMount(){
    const {dispatch,login}=this.props;
    const {token =""} =login;
    dispatch({
      type:'history/getPage',
      payload:{token},
    })
  }

  render() {
    const { submitting, form,history} = this.props;
    const {list=[]}=history;
    const { getFieldDecorator, getFieldValue } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const columns=[{
      title:"Address",
      dataIndex:"address",
    },{
      title:"Bet",
      dataIndex:"bet",
    },{
      title:"optID",
      dataIndex:"optID",
    },{
      title:"optTxID",
      dataIndex:"optTxID",
    },{
      title:"optTxStatus",
      dataIndex:"optTxStatus",
    },{
      title:"Position",
      dataIndex:"position",
    }];

    return (
      <PageHeaderLayout
        title="History"
      >
        <Card bordered={false}>
          <Table dataSource={list} columns={columns} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
