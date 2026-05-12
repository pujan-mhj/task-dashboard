import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskFilter from '~/components/TaskFilter.vue'

describe('TaskFilter Component', () => {
  it('should render all three filter buttons', () => {
    const wrapper = mount(TaskFilter, {
      props: {
        modelValue: 'all',
        totalCount: 10,
        activeCount: 6,
        completedCount: 4
      }
    })
    
    const buttons = wrapper.findAll('.filter-button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0].text()).toContain('All')
    expect(buttons[1].text()).toContain('Active')
    expect(buttons[2].text()).toContain('Completed')
  })

  it('should display correct counts', () => {
    const wrapper = mount(TaskFilter, {
      props: {
        modelValue: 'all',
        totalCount: 10,
        activeCount: 6,
        completedCount: 4
      }
    })
    
    const buttons = wrapper.findAll('.filter-button')
    expect(buttons[0].text()).toContain('10')
    expect(buttons[1].text()).toContain('6')
    expect(buttons[2].text()).toContain('4')
  })

  it('should highlight active filter', () => {
    const wrapper = mount(TaskFilter, {
      props: {
        modelValue: 'active',
        totalCount: 10,
        activeCount: 6,
        completedCount: 4
      }
    })
    
    const buttons = wrapper.findAll('.filter-button')
    expect(buttons[0].classes()).not.toContain('active')
    expect(buttons[1].classes()).toContain('active')
    expect(buttons[2].classes()).not.toContain('active')
  })

  it('should emit update:modelValue when filter is clicked', async () => {
    const wrapper = mount(TaskFilter, {
      props: {
        modelValue: 'all',
        totalCount: 10,
        activeCount: 6,
        completedCount: 4
      }
    })
    
    const buttons = wrapper.findAll('.filter-button')
    await buttons[1].trigger('click')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['active'])
  })

  it('should emit correct filter value for each button', async () => {
    const wrapper = mount(TaskFilter, {
      props: {
        modelValue: 'all',
        totalCount: 10,
        activeCount: 6,
        completedCount: 4
      }
    })
    
    const buttons = wrapper.findAll('.filter-button')
    
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['all'])
    
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['active'])
    
    await buttons[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[2]).toEqual(['completed'])
  })

  it('should have proper ARIA attributes', () => {
    const wrapper = mount(TaskFilter, {
      props: {
        modelValue: 'active',
        totalCount: 10,
        activeCount: 6,
        completedCount: 4
      }
    })
    
    const buttons = wrapper.findAll('.filter-button')
    
    expect(buttons[0].attributes('aria-label')).toBe('Show All tasks')
    expect(buttons[0].attributes('aria-pressed')).toBe('false')
    
    expect(buttons[1].attributes('aria-label')).toBe('Show Active tasks')
    expect(buttons[1].attributes('aria-pressed')).toBe('true')
    
    expect(buttons[2].attributes('aria-label')).toBe('Show Completed tasks')
    expect(buttons[2].attributes('aria-pressed')).toBe('false')
  })

  it('should update counts when props change', async () => {
    const wrapper = mount(TaskFilter, {
      props: {
        modelValue: 'all',
        totalCount: 10,
        activeCount: 6,
        completedCount: 4
      }
    })
    
    // Initial counts
    let buttons = wrapper.findAll('.filter-button')
    expect(buttons[0].text()).toContain('10')
    expect(buttons[1].text()).toContain('6')
    expect(buttons[2].text()).toContain('4')
    
    // Update props
    await wrapper.setProps({
      totalCount: 15,
      activeCount: 10,
      completedCount: 5
    })
    
    // Need to re-query buttons after prop update
    buttons = wrapper.findAll('.filter-button')
    expect(buttons[0].text()).toContain('15')
    expect(buttons[1].text()).toContain('10')
    expect(buttons[2].text()).toContain('5')
  })
})
