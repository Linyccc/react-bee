import React from 'react';
import { mount } from 'enzyme';
import PopEdit from '..';

class PopEditTest extends React.Component {
  handleOk = () => {
    console.log('触发onOk');
  }

  onRender () {
    return <p id="welcome">Welcome</p>
  }

  render () {
    return (
      <PopEdit title='test title' value='123' onOk={this.handleOk} render={this.onRender} />
    )
  }
}

describe('PopEdit', () => {
  it('render correctly', () => {
    const wrapper = mount(<PopEditTest />);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
