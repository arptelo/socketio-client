import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import MainPage from '@/components/MainPage.vue';

describe('MainPage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(MainPage, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
