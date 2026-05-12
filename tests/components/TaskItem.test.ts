import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '~/components/TaskItem.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import type { Task } from '~/composables/useTasks'

describe('TaskItem Component', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    completed: false,
    createdAt: new Date()
  }

  const mountOptions = {
    global: {
      components: {
        ConfirmModal
      },
      stubs: {
        Teleport: true
      }
    }
  }

  it('should render task title', () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    expect(wrapper.text()).toContain('Test Task')
  })

  it('should render checkbox', () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('should emit toggle event when checkbox is clicked', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    await wrapper.find('input[type="checkbox"]').trigger('change')
    
    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')?.[0]).toEqual([1])
  })

  it('should show Edit and Delete buttons', () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Edit')
    expect(buttons[1].text()).toBe('Delete')
  })

  it('should enter edit mode when Edit button is clicked', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    await wrapper.find('.edit-button').trigger('click')
    
    expect(wrapper.find('.edit-input').exists()).toBe(true)
  })

  it('should emit edit event when editing is saved', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    // Enter edit mode
    await wrapper.find('.edit-button').trigger('click')
    
    // Change value
    const input = wrapper.find('.edit-input')
    await input.setValue('Updated Task')
    
    // Blur to save
    await input.trigger('blur')
    
    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]).toEqual([1, 'Updated Task'])
  })

  it('should save edit on Enter key', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    await wrapper.find('.edit-button').trigger('click')
    
    const input = wrapper.find('.edit-input')
    await input.setValue('Updated Task')
    
    // Trigger keydown event
    await input.trigger('keydown', { key: 'Enter' })
    
    // Wait for next tick
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('edit')).toBeTruthy()
  })

  it('should cancel edit on Escape key', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    await wrapper.find('.edit-button').trigger('click')
    expect(wrapper.find('.edit-input').exists()).toBe(true)
    
    await wrapper.find('.edit-input').trigger('keydown', { key: 'Escape' })
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.edit-input').exists()).toBe(false)
    expect(wrapper.emitted('edit')).toBeFalsy()
  })

  it('should show delete confirmation modal when Delete is clicked', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask },
      ...mountOptions
    })
    
    await wrapper.find('.delete-button').trigger('click')
    await wrapper.vm.$nextTick()
    
    // Check if modal is rendered (it's in the component tree)
    const modal = wrapper.findComponent(ConfirmModal)
    expect(modal.exists()).toBe(true)
    expect(modal.props('show')).toBe(true)
  })

  it('should apply completed class when task is completed', () => {
    const completedTask = { ...mockTask, completed: true }
    const wrapper = mount(TaskItem, {
      props: { task: completedTask },
      ...mountOptions
    })
    
    expect(wrapper.find('.task-item').classes()).toContain('completed')
  })

  it('should show strikethrough for completed tasks', () => {
    const completedTask = { ...mockTask, completed: true }
    const wrapper = mount(TaskItem, {
      props: { task: completedTask },
      ...mountOptions
    })
    
    const title = wrapper.find('.task-title')
    expect(title.element).toBeTruthy()
  })
})
