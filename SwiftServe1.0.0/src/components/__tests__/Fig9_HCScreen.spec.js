import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HCScreen from '@/views/Fig9_HawkerCentrePage.vue'

describe ('Fig9_HawkerCentrePage.vue', () => {
    it('Hawker Centre Screen Rendered', () => {
      const wrapper = mount(HCScreen)
      expect(wrapper.find('.container').exists()).toBe(true);

      const filterButtons = wrapper.findComponent({ name: 'FilterButtons' })
      //check filter prop passed also
      expect(filterButtons.exists()).toBe(true)
      expect(filterButtons.props().filters).toBeDefined() 
      expect(filterButtons.props().activeFilter).toBeDefined() 


      const categoryNav = wrapper.findComponent({ name: 'CategoryNav' })
      expect(categoryNav.exists()).toBe(true)
      expect(categoryNav.props().activeCategory).toBeDefined()
      
    })
})