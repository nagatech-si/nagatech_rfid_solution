import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SliderWidget} from './slider/Slider'
import {BannerWidget} from './banner/Banner'
import {useIntl} from 'react-intl'

const MasterPage: React.FC = () => {
  const intl = useIntl()
  const masterMetalBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({id: 'MENU.APPS'}),
      path: '/app',
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
      <Route path='/app/slider'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>
          {intl.formatMessage({id: 'IMAGE.SLIDER'})}
        </PageTitle>
        <SliderWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/app/banner'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>
          {intl.formatMessage({id: 'IMAGE.BANNER'})}
        </PageTitle>
        <BannerWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/master/metal' exact={true} to='/app/slider' />
      <Redirect to='/app/slider' />
    </Switch>
  )
}

export default MasterPage
