import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Table,Button,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ account,login }) => ({
  account,login,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  componentDidMount(){
    const {dispatch,login}=this.props;
    console.log(login);
  }

  handleEmailChange=()=>{
    const {form,dispatch,login}=this.props;
    const {token=""}=login;
    const {getFieldValue} =form;
    const email=getFieldValue("email")||"";
    dispatch({
      type:"login/editEmail",
      payload:{newEmail:email,token},
    })
  };

  render() {
    const {login,form} =this.props;
    const { accounts } =login;
    const {getFieldDecorator}=form;
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
      title:"Coin",
      dataIndex:"coin",
    },{
      title:"Balance",
      dataIndex:"balance",
    },{
      title:"Address",
      dataIndex:"address",
    },{
      title:"Operation",
      render:(record)=>(<Fragment>
        <a>Delete</a>
      </Fragment>),
    }];

    return (
      <PageHeaderLayout
        title="Account"
      >
        <Card bordered={false}>
          <h1>Account Information</h1>
          <Form>
            <hr />
            <h2>Change Email</h2>
            <h3>Origin Email : {login.email}</h3>
            <Form.Item {...formItemLayout}>
              {getFieldDecorator('email')(<Input />)
              }
              <Button type="primary" onClick={this.handleEmailChange} >Change Email</Button>
            </Form.Item>
            <hr />
            <h2>Change Password</h2>
            <Form.Item {...formItemLayout} label="New password">
              {getFieldDecorator('password')(<Input />)
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="Repeat password">
              {getFieldDecorator('repeat')(<Input />)
              }
              <Button type="primary" >Change Password</Button>
            </Form.Item>
            <hr />
            <h2>Add wallet</h2>
            <Form.Item {...formItemLayout} label="Coin">
              {getFieldDecorator('coin')(<Input />)
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="Address">
              {getFieldDecorator('address')(<Input />)
              }
              <Button type="primary" >Add</Button>
            </Form.Item>
          </Form>
          <Table dataSource={accounts} columns={columns} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
