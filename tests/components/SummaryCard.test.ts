import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SummaryCard from '~/components/SummaryCard.vue'

describe('SummaryCard Component', () => {
  it('should render title and value', () => {
    const wrapper = mount(SummaryCard, {
      props: {
        title: 'Total Tasks',
        value: 10
      }
    })
    
    expect(wrapper.find('.card-title').text()).toBe('Total Tasks')
    expect(wrapper.find('.card-value').text()).toBe('10')
  })

  it('should render string values', () => {
    const wrapper = mount(SummaryCard, {
      props: {
        title: 'Status',
        value: 'Active'
      }
    })
    
    expect(wrapper.find('.card-value').text()).toBe('Active')
  })

  it('should apply custom color', () => {
    const wrapper = mount(SummaryCard, {
      props: {
        title: 'Test',
        value: 5,
        color: '#ff0000'
      }
    })
    
    const card = wrapper.find('.summary-card')
    expect(card.attributes('style')).toContain('border-top-color: #ff0000')
  })

  it('should render with zero value', () => {
    const wrapper = mount(SummaryCard, {
      props: {
        title: 'Completed',
        value: 0
      }
    })
    
    expect(wrapper.find('.card-value').text()).toBe('0')
  })
})
