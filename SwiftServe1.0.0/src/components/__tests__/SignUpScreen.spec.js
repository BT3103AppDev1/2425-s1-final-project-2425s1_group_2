import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SignUpScreen from '../Fig4_SignUpPage/SignUpScreen.vue'
import SignUpHeader from '../FigX_UniversalHeader/SignUpHeader.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe ('HomeScreen.vue', () => {
    it('Sign Up Form Created', () => {
        const wrapper = mount(SignUpScreen)
        expect(wrapper.find('#userForm').exists()).toBe(true);
        expect(wrapper.find('.save').exists()).toBe(true);
      })
})

describe ('SignUpHeader.vue', () => {
    it('Login Button Exist and Link to Login Page', async () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [
              { path: '/login' }
            ],
          })
          
          const wrapper = mount(SignUpHeader, {
            global: {
                plugins: [router],
            },
          })

        const button = wrapper.find('button.LoginButt')
        expect (button.exists()).toBe(true)
        expect (button.text()).toBe("Login")
    
        const checker = vi.spyOn(router, 'push')
        await button.trigger('click')
        expect(checker).toHaveBeenCalledWith('/login')
    })
})