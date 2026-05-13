import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProgressBar from '~/components/ProgressBar.vue'

describe('ProgressBar Component', () => {
  it('should render progress percentage', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        percentage: 75
      }
    })
    
    expect(wrapper.find('.td-progress__value').text()).toBe('75%')
  })

  it('should set progress bar width', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        percentage: 60
      }
    })
    
    const progressFill = wrapper.find('.td-progress__fill')
    expect(progressFill.attributes('style')).toContain('width: 60%')
  })

  it('should render 0% progress', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        percentage: 0
      }
    })
    
    expect(wrapper.find('.td-progress__value').text()).toBe('0%')
    expect(wrapper.find('.td-progress__fill').attributes('style')).toContain('width: 0%')
  })

  it('should render 100% progress', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        percentage: 100
      }
    })
    
    expect(wrapper.find('.td-progress__value').text()).toBe('100%')
    expect(wrapper.find('.td-progress__fill').attributes('style')).toContain('width: 100%')
  })

  it('should have proper ARIA attributes', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        percentage: 50
      }
    })
    
    const progressFill = wrapper.find('.td-progress__fill')
    expect(progressFill.attributes('role')).toBe('progressbar')
    expect(progressFill.attributes('aria-valuenow')).toBe('50')
    expect(progressFill.attributes('aria-valuemin')).toBe('0')
    expect(progressFill.attributes('aria-valuemax')).toBe('100')
  })
})
