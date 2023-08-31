/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/MaterialMetalTitleRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IMaterialMetalTitle} from './model/MaterialMetalTitleModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const MaterialMetalTitleWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IMaterialMetalTitle[] = useSelector<RootState>(
    ({materialMetalTitle}) => materialMetalTitle.data
  ) as IMaterialMetalTitle[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_metal_title'))
    dispatch(sampleTypeRedux.actions.fetchAllMaterialMetalTitle())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'metal_title_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'METAL.TITLE'})}
      ),
      sort: true,
    },
    {
      dataField: 'metal_title_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'METAL.COLOUR_TYPE'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IMaterialMetalTitle, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_metal_title'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteMaterialMetalTitle(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditMaterialMetalTitle(values))
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
          data={data.map((datum: IMaterialMetalTitle) => {
            return {
              metal_title_code: datum.metal_title_code,
              metal_title_name: datum.metal_title_name,
            }
          })}
          keyField='metal_title_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {MaterialMetalTitleWidget}
