import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'

export function PrivateRoutes() {
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const MasterPage = lazy(() => import('../pages/master/MasterPage'))
  const ItemPage = lazy(() => import('../pages/item/ItemPage'))
  const RfidPage = lazy(() => import('../pages/rfid/RfidPage'))
  const ReportPage = lazy(() => import('../pages/report/ReportPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/master' component={MasterPage} />
        <Route path='/item' component={ItemPage} />
        <Route path='/rfid' component={RfidPage} />
        <Route path='/report' component={ReportPage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect from='/auth' to='/master/group' />
        <Redirect exact from='/' to='/master/group' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
