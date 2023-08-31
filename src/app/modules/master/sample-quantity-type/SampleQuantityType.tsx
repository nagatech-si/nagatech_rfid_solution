/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleQuantityTypeRedux from './redux/SampleQuantityTypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {ISampleQuantityType} from './model/SampleQuantityTypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const SampleQuantityTypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ISampleQuantityType[] = useSelector<RootState>(
    ({sampleQuantityType}) => sampleQuantityType.data
  ) as ISampleQuantityType[]

  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_sample_quantity_type'))
    dispatch(sampleQuantityTypeRedux.actions.fetchAllSampleQuantityType())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'qty_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}
      ),
      sort: true,
    },
    {
      dataField: 'qty_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ISampleQuantityType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_sample_quantity_type'
            handleDelete={() => {
              dispatch(sampleQuantityTypeRedux.actions.deleteSampleQuantityType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleQuantityTypeRedux.actions.setEditSampleQuantityType(values))
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
          data={data.map((datum: ISampleQuantityType) => {
            return {
              qty_code: datum.qty_code,
              qty_name: datum.qty_name,
            }
          })}
          keyField='qty_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {SampleQuantityTypeWidget}
