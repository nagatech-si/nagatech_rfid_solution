/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as priceTagRedux from './redux/PriceTagRedux'
import * as groupRedux from '../group/redux/GroupRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IPriceTag} from './model/PriceTagModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {PriceTagModal} from './components/PriceTagModal'
import useNotification from '../../../../setup/notification/Notification'

type Props = {
  className: string
}

const PriceTagWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IPriceTag[] = useSelector<RootState>(({priceTag}) => priceTag.data) as IPriceTag[]
  const notifications = useNotification()
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('EMPTY'))
    dispatch(priceTagRedux.actions.fetchAllPriceTag())
    dispatch(groupRedux.actions.fetchAllGroup())
    dispatch(groupRedux.actions.setNotification(notifications))
    // eslint-disable-next-line
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'keterangan',
      text: intl.formatMessage({id: 'DESCRIPTION'}),
      sort: true,
    },
    {
      dataField: 'berat_bandrol',
      text: intl.formatMessage({id: 'WEIGHT.PRICE.TAG'}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IPriceTag, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_price_tag'
            handleUpdate={() => {
              setTimeout(() => {
                document.getElementsByName('berat_bandrol')[0].focus()
              }, 500)
              dispatch(toolbar.actions.SetCreateModalActive(false))
              dispatch(priceTagRedux.actions.setEditPriceTag(values))
            }}
          />
        )
      },
    },
  ]

  return (
    <div className={`card ${className} shadow`}>
      {/* begin::Body */}
      <div className='card-body p-10'>
        {/* begin::Table container */}
        <GlobalTable columns={columns} data={data} keyField='keterangan' />
      </div>
      <PriceTagModal />
      {/* begin::Body */}
    </div>
  )
}

export {PriceTagWidget}
