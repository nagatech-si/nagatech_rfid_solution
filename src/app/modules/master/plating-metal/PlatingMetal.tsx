/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/PlatingMetalRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IPlatingMetal} from './model/PlatingMetalModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const PlatingMetalWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IPlatingMetal[] = useSelector<RootState>(
    ({platingMetal}) => platingMetal.data
  ) as IPlatingMetal[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_plating_metal'))
    dispatch(sampleTypeRedux.actions.fetchAllPlatingMetal())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'plating_metal_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'PLATING.METAL'})}
      ),
      sort: true,
    },
    {
      dataField: 'plating_metal_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'PLATING.METAL'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IPlatingMetal, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_plating_metal'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deletePlatingMetal(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditPlatingMetal(values))
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
          data={data.map((datum: IPlatingMetal) => {
            return {
              plating_metal_code: datum.plating_metal_code,
              plating_metal_name: datum.plating_metal_name,
            }
          })}
          keyField='plating_metal_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {PlatingMetalWidget}
