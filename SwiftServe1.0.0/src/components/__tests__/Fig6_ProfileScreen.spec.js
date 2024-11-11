import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignUpScreen from '../Fig6_ProfilePage/UpdateSettings.vue'
import ProfileComponent from "../Fig14_LiveReceiptsPage/LiveReceiptPage.vue";

describe ('UpdateSettings.vue', () => {
    it('Update Settings Page Created', () => {
        const wrapper = mount(SignUpScreen)
        expect(wrapper.find('.formData').exists()).toBe(true);
      })
})


describe ('LiveReceiptPage.vue', () => {
  it('Side Menu Profile Rendered', () => {
      const wrapper = mount(ProfileComponent)
      expect(wrapper.find('.profile-info').exists()).toBe(true);
  }),

  it("Link to Update Settings Page Rendered", async () => {

    const wrapper = mount(ProfileComponent)
    const routerLink = wrapper.find('router-link#profileLink')

    expect(routerLink.exists()).toBe(true)
    expect(routerLink.attributes().to).toBe('/profile')
  }),

  it("Link to Most Recent Order Receipt Page Rendered", async () => {

    const wrapper = mount(ProfileComponent)
    const routerLink = wrapper.find('router-link#liveReceiptLink')

    expect(routerLink.exists()).toBe(true)
    expect(routerLink.attributes().to).toBe('/livereceipt')
  }),

  it("Delete Account Button Rendered", async () => {
    const wrapper = mount(ProfileComponent)
    const button = wrapper.find('button#deleteButton')
    expect (button.exists()).toBe(true)
  })


})