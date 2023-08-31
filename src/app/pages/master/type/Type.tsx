/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/TypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IType} from './model/TypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {TypeModal} from './components/TypeModal'

type Props = {
  className: string
}

const TypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IType[] = useSelector<RootState>(({type}) => type.data) as IType[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_type'))
    dispatch(sampleTypeRedux.actions.fetchAllType())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'kode_jenis',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TYPE'})}),
      sort: true,
    },
    {
      dataField: 'kode_group',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'GROUP'})}),
      sort: true,
    },
    {
      dataField: 'nama_jenis',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'TYPE'})}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_type'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditType(values))
            }}
          />
        )
      },
    },
  ]

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-10'>
        {/* begin::Table container */}
        <GlobalTable columns={columns} data={data} keyField='kode_jenis' />
      </div>
      <TypeModal />
      {/* begin::Body */}
    </div>
  )
}

export {TypeWidget}
