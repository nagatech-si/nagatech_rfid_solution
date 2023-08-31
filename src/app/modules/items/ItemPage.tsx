import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {MasterLineWidget} from './master-line/MasterLine'
import {ShowroomWidget} from './showroom/Showroom'
import {UploadNewWidget} from './upload-new/UploadNew'
import {useIntl} from 'react-intl'

const ItemPage: React.FC = () => {
const masterMetalBreadCrumbs: Array<PageLink> = [
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
  const intl = useIntl()
  return (
    <Switch>
      <Route path='/item/master-line'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>{intl.formatMessage(
          {id: 'MASTER.LINE'})}</PageTitle>
        <MasterLineWidget className='mb-5 mb-xl-8' />
      </Route>

      <Route path='/item/showroom'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>{intl.formatMessage(
          {id: 'SHOWROOM'})}</PageTitle>
        <ShowroomWidget className='mb-5 mb-xl-8' />
      </Route>

      <Route path='/item/upload-new'>
        <PageTitle breadcrumbs={masterMetalBreadCrumbs}>{intl.formatMessage(
          {id: 'ITEM.UPLOAD_NEW'})}</PageTitle>
        <UploadNewWidget />
      </Route>

      <Redirect from='/master/metal' exact={true} to='/item/master-line' />
      <Redirect to='/item/master-line' />
    </Switch>
  )
}

export default ItemPage
