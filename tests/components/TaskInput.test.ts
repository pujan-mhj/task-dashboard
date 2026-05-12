import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskInput from '~/components/TaskInput.vue'

describe('TaskInput Component', () => {
  it('should render input and button', () => {
    const wrapper = mount(TaskInput)
    
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Add')
  })

  it('should emit add event with task title on button click', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')?.[0]).toEqual(['New Task'])
  })

  it('should emit add event on Enter key', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    
    await input.setValue('New Task')
    await input.trigger('keyup.enter')
    
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')?.[0]).toEqual(['New Task'])
  })

  it('should show error for empty input', async () => {
    const wrapper = mount(TaskInput)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toBe('Task title cannot be empty')
  })

  it('should clear input after successful submission', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')
    
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('should clear error when user types', async () => {
    const wrapper = mount(TaskInput)
    
    // Trigger error
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.error-message').exists()).toBe(true)
    
    // Type something
    await wrapper.find('input').setValue('New Task')
    
    expect(wrapper.find('.error-message').exists()).toBe(false)
  })

  it('should not emit for whitespace-only input', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    
    await input.setValue('   ')
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('add')).toBeFalsy()
    expect(wrapper.find('.error-message').exists()).toBe(true)
  })
})
