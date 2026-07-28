import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Listings } from './components/listings/listings';
import { NgModule } from '@angular/core';
import { DashboardHeader } from './layout/headers/dashboard-header/dashboard-header';
import { ListingsHeader } from './layout/headers/listings-header/listings-header';
import { AppLayout } from './layout/app-layout/app-layout';
import { LeadManagement } from './components/lead-management/lead-management';
import { LeadMHeader } from './layout/headers/lead-m-header/lead-m-header';
import { Calandar } from './components/calandar/calandar';
import { CalandarHeader } from './layout/headers/calandar-header/calandar-header';
import { MapLayout } from './layout/map-layout/map-layout';
import { MapSideBar } from './components/map-side-bar/map-side-bar';
import { Map } from './pages/map/map';
import { PerformanceHeader } from './layout/headers/performance-header/performance-header';
import { Performance } from './components/performance/performance';
import { Earning } from './components/earning/earning';
import { EarningHeader } from './layout/headers/earning-header/earning-header';
import { Login } from './pages/login/login';
import { CreateProperty } from './components/create-property/create-property';
import { Home } from './pages/home/home';
import { PropertyDetails } from './pages/property-details/property-details';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        pathMatch: 'full'
    },{
        path: 'login',
        component: Login,
    },
    {
        path: 'property/:id',
        component: PropertyDetails,
    },
    {
        path: 'd',
        component: AppLayout,
        children: [

            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        component: Dashboard
                    },
                    {
                        path: '',
                        component: DashboardHeader,
                        outlet: 'header'
                    }
                ]
            },

            // ===== LISTINGS =====
            {
                path: 'listings',
                children: [
                    {
                        path: '',
                        component: Listings
                    },
                    {
                        path: '',
                        component: ListingsHeader,
                        outlet: 'header'
                    }
                ]
            },
            {
                path: 'new-listing',
                children: [
                    {
                        path: '',
                        component: CreateProperty
                    },
                    {
                        path: '',
                        component: ListingsHeader,
                        outlet: 'header'
                    }
                ]
            },
            {
                path: 'lead',
                children: [
                    {
                        path: '',
                        component: LeadManagement
                    },
                    {
                        path: '',
                        component: LeadMHeader,
                        outlet: 'header'
                    }
                ]
            },
            {
                path: 'calandar',
                children: [
                    {
                        path: '',
                        component: Calandar
                    },
                    {
                        path: '',
                        component: CalandarHeader,
                        outlet: 'header'
                    }
                ]
            },
            {
                path: 'performance',
                children: [
                    {
                        path: '',
                        component: Performance
                    },
                    {
                        path: '',
                        component: PerformanceHeader,
                        outlet: 'header'
                    }
                ]
            },
            {
                path: 'earnings',
                children: [
                    {
                        path: '',
                        component: Earning
                    },
                    {
                        path: '',
                        component: EarningHeader,
                        outlet: 'header'
                    }
                ]
            },
            // ===== Map Layout (NO HEADER) =====
            {
                path: 'map',
                component: MapLayout,
                children: [
                    {
                        path: '',
                        component: Map
                    }
                ]
            },
            // ===== DEFAULT REDIRECT =====
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }