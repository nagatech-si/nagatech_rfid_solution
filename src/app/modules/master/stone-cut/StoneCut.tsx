/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/StoneCutRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IStoneCut} from './model/StoneCutModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const StoneCutWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IStoneCut[] = useSelector<RootState>(({stoneCut}) => stoneCut.data) as IStoneCut[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_cut_stone'))
    dispatch(sampleTypeRedux.actions.fetchAllStoneCut())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'cut_stone_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'STONE.CUT'})}
      ),
      sort: true,
    },
    {
      dataField: 'cut_stone_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'STONE.CUT'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IStoneCut, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_cut_stone'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteStoneCut(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditStoneCut(values))
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
          data={data.map((datum: IStoneCut) => {
            return {
              cut_stone_code: datum.cut_stone_code,
              cut_stone_name: datum.cut_stone_name,
            }
          })}
          keyField='cut_stone_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StoneCutWidget}
