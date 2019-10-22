import React from 'react'
import { shallow } from 'enzyme'
import Icon from '@mdi/react'
import Button from '@/components/toolbar/button'

const render = props => shallow(<Button {...props} />)

describe('Toolbar <Button/>', () => {
  it('should have button html', () => {
    const props = {
      title: 'title',
      onClick: jest.fn(),
      disabled: false,
    }
    const wrapper = render(props)
    const button = wrapper.find('button')
    expect(button.prop('title')).toBe(props.title)
    expect(button.prop('disabled')).toBe(props.disabled)
    expect(button.prop('className')).toEqual('button')
    button.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('should have button html with type class', () => {
    const props = {
      type: 'type',
    }
    const wrapper = render(props)
    const button = wrapper.find('button')
    const expectedClassName = `button button-${props.type}`
    expect(button.prop('className')).toEqual(expectedClassName)
  })

  it('should have button html with active class', () => {
    const props = {
      active: true,
    }
    const wrapper = render(props)
    const button = wrapper.find('button')
    const expectedClassName = `button button--active`
    expect(button.prop('className')).toEqual(expectedClassName)
  })

  it('should have children', () => {
    const props = {
      children: 'children',
    }
    const wrapper = render(props)
    const span = wrapper.find('.villain-label')
    expect(span.prop('children')).toBe(props.children)
  })

  it('should have label', () => {
    const props = {
      label: 'label',
    }
    const wrapper = render(props)
    const span = wrapper.find('.villain-label')
    expect(span.prop('children')).toBe(props.label)
  })

  it('should have icon', () => {
    const props = {
      icon: 'icon',
    }
    const wrapper = render(props)
    const icon = wrapper.find(Icon)
    expect(icon.prop('path')).toBe(props.icon)
    expect(icon.prop('size')).toEqual('26px')
    expect(icon.prop('className')).toEqual('villain-icon')
  })

  it('should have aria-label if ariaLabel prop is provided', () => {
    const props = {
      ariaLabel: 'ariaLabel',
    }
    const wrapper = render(props)
    const button = wrapper.find('button')
    expect(button.prop('aria-label')).toEqual(props.ariaLabel)
  })

  it('should have aria-label if title prop is provided', () => {
    const props = {
      title: 'title',
    }
    const wrapper = render(props)
    const button = wrapper.find('button')
    expect(button.prop('aria-label')).toEqual(props.title)
  })

  it('should have role equal to button', () => {
    const wrapper = render()
    const button = wrapper.find('button')
    expect(button.prop('role')).toEqual('button')
  })
})
