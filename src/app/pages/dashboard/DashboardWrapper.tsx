/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {MixedWidget1} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => {
  const intl = useIntl()
  return (
    <>
      {/* begin::Row */}
      <div className='row'>
        <div className='row'>
          {/* begin::Col */}
          <div className='col-xl-6'>
            <MixedWidget1
              className='card-xl-stretch mb-xl-8'
              color='danger'
              name={intl.formatMessage(
                {id: 'SUFFIX.ACTIVE'},
                {name: intl.formatMessage({id: 'REGION'})}
              )}
              valueTitle={intl.formatMessage(
                {id: 'SUFFIX.ACTIVE'},
                {name: intl.formatMessage({id: 'REGION'})}
              )}
              title={intl.formatMessage({id: 'VIEW.PRODUK'})}
              datas={[]}
            />
          </div>
          {/* end::Col */}
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
