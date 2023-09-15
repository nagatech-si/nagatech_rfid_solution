import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import {ItemWidget} from './add/Item'
import {ShowItemWidget} from './show_data/ShowItem'

const itemBreadCrumbs: Array<PageLink> = [
  {
    title: 'Item',
    path: '/item',
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

const ItemPage: React.FC = () => {
  const intl = useIntl()
  return (
    <Switch>
      <Route path='/item/add'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>{intl.formatMessage({id: 'ADD.ITEM'})}</PageTitle>
        <ItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/item/view'>
        <PageTitle breadcrumbs={itemBreadCrumbs}>{intl.formatMessage({id: 'DATA.ITEM'})}</PageTitle>
        <ShowItemWidget className='mb-5 mb-xl-8' />
      </Route>
      <Redirect from='/item' exact={true} to='/item/add' />
      <Redirect to='/item/add' />
    </Switch>
  )
}

export default ItemPage
