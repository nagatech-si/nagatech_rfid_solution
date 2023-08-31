/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/StoneTypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IStoneType} from './model/StoneTypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const StoneTypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IStoneType[] = useSelector<RootState>(({stoneType}) => stoneType.data) as IStoneType[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_stone_type'))
    dispatch(sampleTypeRedux.actions.fetchAllStoneType())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'stone_type_code',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'STONE.TYPE'})}),
      sort: true,
    },
    {
      dataField: 'stone_type_name',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'STONE.TYPE'})}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IStoneType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_stone_type'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteStoneType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditStoneType(values))
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
          data={data.map((datum: IStoneType) => {
            return {
              stone_type_code: datum.stone_type_code,
              stone_type_name: datum.stone_type_name,
            }
          })}
          keyField='stone_type_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StoneTypeWidget}
