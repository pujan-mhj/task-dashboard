import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmModal from '~/components/ConfirmModal.vue'

describe('ConfirmModal Component', () => {
  it('should not render when show is false', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: false,
        title: 'Test',
        message: 'Test message'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('should render when show is true', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
        title: 'Test Title',
        message: 'Test message'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.find('.modal-title').text()).toBe('Test Title')
    expect(wrapper.find('.modal-body').text()).toContain('Test message')
  })

  it('should emit confirm event when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
        title: 'Test',
        message: 'Test message'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    
    await wrapper.find('.btn-confirm').trigger('click')
    
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('should emit cancel event when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
        title: 'Test',
        message: 'Test message'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    
    await wrapper.find('.btn-cancel').trigger('click')
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('should emit cancel when clicking overlay', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
        title: 'Test',
        message: 'Test message'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    
    await wrapper.find('.modal-overlay').trigger('click')
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('should use custom button text', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
        title: 'Test',
        message: 'Test message',
        confirmText: 'Yes',
        cancelText: 'No'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    
    expect(wrapper.find('.btn-confirm').text()).toBe('Yes')
    expect(wrapper.find('.btn-cancel').text()).toBe('No')
  })

  it('should use default button text when not provided', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
        title: 'Test',
        message: 'Test message'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    
    expect(wrapper.find('.btn-confirm').text()).toBe('Confirm')
    expect(wrapper.find('.btn-cancel').text()).toBe('Cancel')
  })
})
