/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/CountryRedux'

import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {ICountry} from './model/CountryModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const CountryWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ICountry[] = useSelector<RootState>(({country}) => country.data) as ICountry[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_country'))
    dispatch(sampleTypeRedux.actions.fetchAllCountry())
  }, [dispatch])
  const intl =useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_negara',
      text: intl.formatMessage(
          {id: 'BASE.NAME'},
          {name: intl.formatMessage({id: 'COUNTRY'})}
        ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ICountry, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_country'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteCountry(values))
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
          data={data.map((datum: ICountry) => {
            return {
              _id: datum._id,
              nama_negara: datum.nama_negara,
            }
          })}
          keyField='nama_negara'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {CountryWidget}
