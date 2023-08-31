/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/ChainTypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IChainType} from './model/ChainTypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const ChainTypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IChainType[] = useSelector<RootState>(({chainType}) => chainType.data) as IChainType[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_chain_type'))
    dispatch(sampleTypeRedux.actions.fetchAllChainType())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'chain_type_code',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'CHAIN.TYPE'})}),
      sort: true,
    },
    {
      dataField: 'chain_type_name',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'CHAIN.TYPE'})}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IChainType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_chain_type'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteChainType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditChainType(values))
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
        <GlobalTable
          columns={columns}
          data={data.map((datum: IChainType) => {
            return {
              chain_type_code: datum.chain_type_code,
              chain_type_name: datum.chain_type_name,
            }
          })}
          keyField='chain_type_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {ChainTypeWidget}
