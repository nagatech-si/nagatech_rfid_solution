/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/MetalColourTypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IMetalColourType} from './model/MetalColourTypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const MetalColourTypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IMetalColourType[] = useSelector<RootState>(
    ({metalColourType}) => metalColourType.data
  ) as IMetalColourType[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_metal_colour_type'))
    dispatch(sampleTypeRedux.actions.fetchAllMetalColourType())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'colour_type_code',
      text: intl.formatMessage(
          {id: 'BASE.CODE'},
          {name: intl.formatMessage({id: 'METAL.COLOUR_TYPE'})}
        ),
      sort: true,
    },
    {
      dataField: 'colour_type_name',
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
      formatter: (_: any, values: IMetalColourType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_metal_colour_type'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteMetalColourType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditMetalColourType(values))
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
          data={data.map((datum: IMetalColourType) => {
            return {
              colour_type_code: datum.colour_type_code,
              colour_type_name: datum.colour_type_name,
            }
          })}
          keyField='colour_type_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {MetalColourTypeWidget}
