/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as typeRedux from './redux/ItemConditionRedux'
import * as groupRedux from '../group/redux/GroupRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IItemCondition} from './model/ItemConditionModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {ItemConditionModal} from './components/ItemConditionModal'
import useNotification from '../../../../setup/notification/Notification'

type Props = {
  className: string
}

const ItemConditionWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IItemCondition[] = useSelector<RootState>(
    ({itemCondition}) => itemCondition.data
  ) as IItemCondition[]
  const notifications = useNotification()
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_item_condition'))
    dispatch(toolbar.actions.SetFocusName('kondisi_barang'))
    dispatch(typeRedux.actions.fetchAllItemCondition())
    dispatch(groupRedux.actions.setNotification(notifications))
    // eslint-disable-next-line
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'kondisi_barang',
      text: intl.formatMessage({id: 'ITEM.CONDITION'}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IItemCondition, index: number) => {
        return (
          <DropdownAction
            DeleteName={intl.formatMessage({id: 'ITEM.CONDITION'}) + ' ' + values.kondisi_barang}
            modalName='kt_modal_item_condition'
            handleDelete={() => {
              dispatch(typeRedux.actions.deleteItemCondition(values))
            }}
            handleUpdate={() => {
              setTimeout(() => {
                document.getElementsByName('kondisi_barang')[0].focus()
              }, 500)
              dispatch(toolbar.actions.SetCreateModalActive(false))
              dispatch(typeRedux.actions.setEditItemCondition(values))
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
        <GlobalTable columns={columns} data={data} keyField='kondisi_barang' />
      </div>
      <ItemConditionModal />
      {/* begin::Body */}
    </div>
  )
}

export {ItemConditionWidget}
