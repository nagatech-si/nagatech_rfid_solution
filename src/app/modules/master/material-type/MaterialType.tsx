/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/MaterialTypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IMaterialType} from './model/MaterialTypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const MaterialTypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IMaterialType[] = useSelector<RootState>(
    ({materialType}) => materialType.data
  ) as IMaterialType[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_material_type'))
    dispatch(sampleTypeRedux.actions.fetchAllMaterialType())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'material_type_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'MATERIAL.TYPE'})}
      ),
      sort: true,
    },
    {
      dataField: 'material_type_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'MATERIAL.TYPE'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IMaterialType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_material_type'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteMaterialType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditMaterialType(values))
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
          data={data.map((datum: IMaterialType) => {
            return {
              material_type_code: datum.material_type_code,
              material_type_name: datum.material_type_name,
            }
          })}
          keyField='material_type_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {MaterialTypeWidget}
