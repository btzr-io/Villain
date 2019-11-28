import React from 'react'
import { shallow } from 'enzyme'
import Icon from '@mdi/react'
import Button from '@/components/toolbar/button'

const render = props => shallow(<Button {...props} />)

describe('Toolbar <Button/>', () => {
  it('should have button html', () => {
    const props = { onClick: jest.fn() }
    const button = render(props)
    button.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
