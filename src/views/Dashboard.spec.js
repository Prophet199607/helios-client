import { mount } from '@vue/test-utils';
import Dashboard from '@/views/Dashboard.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

describe('Dashboard.vue', () => {
    it('renders DashboardCard components with correct props', () => {
        const wrapper = mount(Dashboard);
        const dashboardCards = wrapper.findAllComponents(DashboardCard);
        expect(dashboardCards).toHaveLength(4);

        expect(dashboardCards[0].props('svg_icon')).toEqual(user);
        expect(dashboardCards[0].props('title')).toEqual('Total Patients');
        // Add more expectations for other props

        expect(dashboardCards[1].props('svg_icon')).toEqual(eye);
        expect(dashboardCards[1].props('title')).toEqual('DR Cases');
        // Add more expectations for other props

        // Repeat for other DashboardCard components
    });

    it('renders Breadcrumbs component with correct props', () => {
        const wrapper = mount(Dashboard);
        const breadcrumbs = wrapper.findComponent(Breadcrumbs);
        expect(breadcrumbs.exists()).toBe(true);
        expect(breadcrumbs.props('items')).toEqual([]);
        expect(breadcrumbs.classes()).toContain('absolute');
        expect(breadcrumbs.classes()).toContain('top-[20px]');
        expect(breadcrumbs.classes()).toContain('max-w-[250px]');
        // Add more expectations for other props or classes
    });
});
