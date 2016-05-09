import React, { Component } from 'react';
import { Panel, Button, Col, Row } from 'react-bootstrap';
import { typeDescriptions } from './typeDescriptions';
import { SmsMessageTask } from './SmsMessageTask';
import { EmailTask } from './EmailTask';

class Task extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    completeTask: React.PropTypes.func.isRequired,
    callback: React.PropTypes.func
  }

  taskSpecificComponents = () => {
    if(this.props.type === 'sms_message') {
      return(<SmsMessageTask  {...this.props} />)
    } else if (this.props.type === 'email') {
      return(<EmailTask {...this.props} />)
    } else {
      return(null)
    }
  }

  render() {
    return(
      <Panel header={<h3>{typeDescriptions[this.props.type]}</h3>}>
        <Row>
          <Col xs={12}>
            {this.taskSpecificComponents()}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button bsStyle='success' onClick={this.props.completeTask} >
              Complete Task
            </Button>
          </Col>
        </Row>
      </Panel>
    )
  }
}

export class TaskDashboard extends Component {
  static propTypes = {
    completeTask: React.PropTypes.func.isRequired,
    callback: React.PropTypes.func,
    task: React.PropTypes.object
  }

  render() {
    if(this.props.task) {
      return(<Task {...this.props.task.attributes} completeTask={this.props.completeTask} callback={this.props.callback} />);
    } else {
      return(null);
    }
  }
}
