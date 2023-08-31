/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/sampleTypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {ISampleType} from './model/SampleTypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const SampleTypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ISampleType[] = useSelector<RootState>(
    ({sampleType}) => sampleType.data
  ) as ISampleType[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_sample_type'))
    dispatch(sampleTypeRedux.actions.fetchAllSampleType())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'sample_type_code',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'SAMPLE.TYPE'})}),
      sort: true,
    },
    {
      dataField: 'sample_type_name',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'SAMPLE.TYPE'})}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ISampleType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_sample_type'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteSampleType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditSampleType(values))
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
          data={data.map((datum: ISampleType) => {
            return {
              sample_type_code: datum.sample_type_code,
              sample_type_name: datum.sample_type_name,
            }
          })}
          keyField='sample_type_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {SampleTypeWidget}
