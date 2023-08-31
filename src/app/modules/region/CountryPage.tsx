import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {CountryWidget} from './country/Country'
import {ProvinceWidget} from './province/Province'
import {CityWidget} from './city/City'
import {AreaWidget} from './area/Area'
import {useIntl} from 'react-intl'

const MasterPage: React.FC = () => {
  const intl = useIntl()
  const countryBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({id: 'REGION'}),
      path: '/region',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <Switch>
      <Route path='/region/country'>
        <PageTitle breadcrumbs={countryBreadCrumbs}>
          {intl.formatMessage({id: 'COUNTRY'})}
        </PageTitle>
        <CountryWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/region/province'>
        <PageTitle breadcrumbs={countryBreadCrumbs}>
          {intl.formatMessage({id: 'PROVINCE'})}
        </PageTitle>
        <ProvinceWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/region/city'>
        <PageTitle breadcrumbs={countryBreadCrumbs}>{intl.formatMessage({id: 'CITY'})}</PageTitle>
        <CityWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/region/area'>
        <PageTitle breadcrumbs={countryBreadCrumbs}>{intl.formatMessage({id: 'AREA'})}</PageTitle>
        <AreaWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/manage/user' exact={true} to='/region/country' />
      <Redirect to='/region/country' />
    </Switch>
  )
}

export default MasterPage
