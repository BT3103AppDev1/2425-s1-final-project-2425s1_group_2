import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustDScreen from '../Fig7_CustDashboardPage/CustOrders.vue'

describe ('CustOrders.vue', () => {
    it('CustD Screen Rendered', () => {
      const wrapper = mount(CustDScreen)
      expect(wrapper.find('.current-placed-orders').exists()).toBe(true);
      expect(wrapper.find('.past-orders').exists()).toBe(true);
    })
})