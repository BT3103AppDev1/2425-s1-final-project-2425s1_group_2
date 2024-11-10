import { mount } from '@vue/test-utils'
import Signup from '@/components/Signup.vue'
import { describe, it, expect, jest } from '@jest/globals'

describe('Signup.vue', () => {
  it('submits the form when all fields are valid', async () => {
    const wrapper = mount(Signup)

    // Mock the savetoFirestore method
    wrapper.vm.savetoFirestore = jest.fn()

    // Set input values
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#username').setValue('testuser')
    await wrapper.find('#password1').setValue('password123')
    await wrapper.find('#cPassword1').setValue('password123')
    await wrapper.find('#agreeTerms').setChecked(true)

    // Trigger button click
    await wrapper.find('#savebutton').trigger('click')

    // Check if the method savetoFirestore has been called
    expect(wrapper.vm.savetoFirestore).toHaveBeenCalled()
  })

  it('shows an alert when fields are missing', async () => {
    const wrapper = mount(Signup)

    // Leave some fields empty
    await wrapper.find('#email').setValue('')
    await wrapper.find('#username').setValue('')
    await wrapper.find('#password1').setValue('password123')
    await wrapper.find('#cPassword1').setValue('password123')
    await wrapper.find('#agreeTerms').setChecked(true)

    // Mock window alert
    window.alert = jest.fn()

    // Trigger button click
    await wrapper.find('#savebutton').trigger('click')

    // Check if alert was called with a specific message
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Please fill in all fields'))
  })

  it('opens the terms and conditions modal when the link is clicked', async () => {
    const wrapper = mount(Signup)

    // Trigger click on terms link
    await wrapper.find('.terms-link').trigger('click')

    // Check if showTermsModal is true
    expect(wrapper.vm.showTermsModal).toBe(true)
  })
})
