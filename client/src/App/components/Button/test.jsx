
import React from 'react';
import { mount } from 'enzyme';
import Button from './index';


describe('Button Component', () => {

 const mockClick = jest.fn();
 const wrapper = mount(<Button onClick={mockClick} />);

 it('should render', () => {
   expect(wrapper.find('.button-component').length).toEqual(1)
 });

	it('has a functioning click handler', () => {
		wrapper.find('button').simulate('click');
		expect(mockClick.mock.calls.length).toEqual(1);
	});

});