import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeScreen from '../Fig3_WelcomePage/HomeScreen.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe ('HomeScreen.vue', () => {
    //sanity check: page contains "Let's Get Started"
    /*it("Let's Get Started Text Exist", () => {
        const wrapper = mount(HomeScreen)
        expect (wrapper.text()).toContain("Let's Get Started")
    }),*/

    it("Let's Get Started Button Exist and Link to Sign Up Page", async () => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [
              { path: '/signup' }
            ],
          })

        const wrapper = mount(HomeScreen, {
            global: {
              plugins: [router],
            },
        })

        const button = wrapper.find('button.LGSButton')
        expect (button.exists()).toBe(true)
        expect (button.text()).toBe("Let's Get Started")

        const checker = vi.spyOn(router, 'push')
        await button.trigger('click')
        expect(checker).toHaveBeenCalledWith('/signup')
    }),

    it("Login Hyperlink Exist and Point to Login Page", async () => {

        const wrapper = mount(HomeScreen)
        const routerLink = wrapper.find('router-link.Link')

        expect (routerLink.exists()).toBe(true)
        expect(routerLink.text()).toBe('Log in')
        expect(routerLink.attributes().to).toBe('/login')
    }),

    it("Continue as Guest Exist", () => {

        const wrapper = mount(HomeScreen)
        const guestLink = wrapper.find('#guest')

        expect (guestLink.exists()).toBe(true)
        expect(guestLink.text()).toBe('Continue as Guest')
    })


})