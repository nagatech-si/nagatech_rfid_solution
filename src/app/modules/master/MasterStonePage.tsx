import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'

import {StoneTypeWidget} from './stone-type/StoneType'
import {StoneColourWidget} from './stone-colour/StoneColour'
import {StoneCutWidget} from './stone-cut/StoneCut'
import {StoneShapeWidget} from './stone-shape/StoneShape'
import {StoneGradeWidget} from './stone-grade/StoneGrade'
import {StoneOriginWidget} from './stone-origin/StoneOrigin'
import {StoneCategoryWidget} from './stone-category/StoneCategory'
import {useIntl} from 'react-intl'

const MasterPage: React.FC = () => {
const intl = useIntl()
const masterStoneBreadCrumbs: Array<PageLink> = [
  {
    title: intl.formatMessage(
        {id: 'STONE.MASTER'}),
    path: '/master/stone',
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
      <Route path='/master/stone/stone-category'>
        <PageTitle breadcrumbs={masterStoneBreadCrumbs}> {intl.formatMessage(
          {id: 'STONE.CATEGORY'})}</PageTitle>
        <StoneCategoryWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/stone/stone-type'>
        <PageTitle breadcrumbs={masterStoneBreadCrumbs}>{intl.formatMessage(
          {id: 'STONE.TYPE'})}</PageTitle>
        <StoneTypeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/stone/stone-colour'>
        <PageTitle breadcrumbs={masterStoneBreadCrumbs}>{intl.formatMessage(
          {id: 'STONE.COLOUR'})}</PageTitle>
        <StoneColourWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/stone/stone-cut'>
        <PageTitle breadcrumbs={masterStoneBreadCrumbs}>{intl.formatMessage(
          {id: 'STONE.CUT'})}</PageTitle>
        <StoneCutWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/stone/stone-shape'>
        <PageTitle breadcrumbs={masterStoneBreadCrumbs}>{intl.formatMessage(
          {id: 'STONE.SHAPE'})}</PageTitle>
        <StoneShapeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/stone/stone-grade'>
        <PageTitle breadcrumbs={masterStoneBreadCrumbs}>{intl.formatMessage(
          {id: 'STONE.GRADE'})}</PageTitle>
        <StoneGradeWidget className='mb-5 mb-xl-8' />
      </Route>
      <Route path='/master/stone/stone-origin'>
        <PageTitle breadcrumbs={masterStoneBreadCrumbs}>{intl.formatMessage(
          {id: 'STONE.ORIGIN'})}</PageTitle>
        <StoneOriginWidget className='mb-5 mb-xl-8' />
      </Route>

      <Redirect from='/master/stone' exact={true} to='/master/stone/sample-type' />
      <Redirect to='/master/stone/stone-type' />
    </Switch>
  )
}

export default MasterPage
