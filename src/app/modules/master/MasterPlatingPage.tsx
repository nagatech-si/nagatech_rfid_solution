import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {PlatingColourWidget} from './plating-colour/PlatingColour'
import {PlatingMetalWidget} from './plating-metal/PlatingMetal'
import {PlatingMethodWidget} from './plating-method/PlatingMethod'
import {useIntl} from 'react-intl'


const MasterPage: React.FC = () => {
  const intl = useIntl()
const masterBreadCrumbs: Array<PageLink> = [
  {
    title: intl.formatMessage({id: 'PLATING.MASTER'}),
    path: '/master/plating',
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
      <Route path='/master/plating/plating-colour'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>{intl.formatMessage({id: 'PLATING.COLOUR'})}</PageTitle>
        <PlatingColourWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/plating/plating-metal'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>{intl.formatMessage({id: 'PLATING.METAL'})}</PageTitle>
        <PlatingMetalWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/plating/plating-method'>
        <PageTitle breadcrumbs={masterBreadCrumbs}>{intl.formatMessage({id: 'PLATING.METHOD'})}</PageTitle>
        <PlatingMethodWidget className='mb-5 mb-xl-8' />
      </Route>
      <Redirect from='/master/plating' exact={true} to='/master/plating/sample-type' />
      <Redirect to='/master/plating/sample-type' />
    </Switch>
  )
}

export default MasterPage
