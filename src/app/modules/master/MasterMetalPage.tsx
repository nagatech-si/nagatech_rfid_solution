import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {MetalColourTypeWidget} from './metal-colour-type/MetalColourType'
import {NickelContentWidget} from './nickel-content/NickelContent'
import {MaterialMetalTitleWidget} from './material-meta-title/MaterialMetalTitle'
import {useIntl} from 'react-intl'


const MasterPage: React.FC = () => {
  const intl=  useIntl()
const masterMetalBreadCrumbs: Array<PageLink> = [
  {
    title: intl.formatMessage({id: 'METAL.MASTER'}),
    path: '/master/metal',
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
      <Route path='/master/metal/metal-colour-type'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>{intl.formatMessage(
          {id: 'METAL.COLOUR_TYPE'})}</PageTitle>
        <MetalColourTypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/metal/nickel-content'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>{intl.formatMessage(
          {id: 'METAL.NICKEL_CONTENT'})}</PageTitle>
        <NickelContentWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/metal/material-metal-title'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>{intl.formatMessage(
          {id: 'METAL.TITLE'})}</PageTitle>
        <MaterialMetalTitleWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/master/metal' exact={true} to='/master/metal/metal-colour-type' />
      <Redirect to='/master/metal/metal-colour-type' />
    </Switch>
  )
}

export default MasterPage
