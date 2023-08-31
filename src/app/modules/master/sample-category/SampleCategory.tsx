/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from '../sample-category/redux/SampleCategoryRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {ISampleCategory} from './model/SampleCategoryModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const SampleCategoryWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ISampleCategory[] = useSelector<RootState>(
    ({sampleCategory}) => sampleCategory.data
  ) as ISampleCategory[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_sample_category'))
    dispatch(sampleTypeRedux.actions.fetchAllSampleCategory())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'category_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'SAMPLE.CATEGORY'})}
      ),
      sort: true,
    },
    {
      dataField: 'category_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'SAMPLE.CATEGORY'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ISampleCategory, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_sample_category'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteSampleCategory(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditSampleCategory(values))
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
          data={data.map((datum: ISampleCategory) => {
            return {
              category_code: datum.category_code,
              category_name: datum.category_name,
            }
          })}
          keyField='category_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {SampleCategoryWidget}
