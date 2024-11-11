import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginScreen from '../Fig5_LoginPage/LoginScreen.vue'
import LoginHeader from '../FigX_UniversalHeader/LoginHeader.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe ('HomeScreen.vue', () => {
    it('Login Form Rendered', () => {
        const wrapper = mount(LoginScreen)
        expect(wrapper.find('.login-page').exists()).toBe(true);
        expect(wrapper.find('.login-button').exists()).toBe(true);
      })
})


describe ('SignUpHeader.vue', () => {
  it('Sign Up Button Exist and Link to Sign Up Page', async () => {
      const router = createRouter({
          history: createWebHistory(),
          routes: [
            { path: '/signup' }
          ],
        })
        
        const wrapper = mount(LoginHeader, {
          global: {
              plugins: [router],
          },
        })

      const button = wrapper.find('button.signUpButt')
      expect (button.exists()).toBe(true)
      expect (button.text()).toBe("Sign Up")
  
      const checker = vi.spyOn(router, 'push')
      await button.trigger('click')
      expect(checker).toHaveBeenCalledWith('/signup')
  })
})