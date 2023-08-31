/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as cityRedux from './redux/CityRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {ICity} from './model/CityModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const CityWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ICity[] = useSelector<RootState>(({city}) => city.data) as ICity[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_city'))
    dispatch(cityRedux.actions.fetchAllCity())
  }, [dispatch])
  const intl =useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_provinsi',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'PROVINCE'})}
      ),
      sort: true,
    },
    {
      dataField: 'nama_kota',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'CITY'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ICity, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_city'
            handleDelete={() => {
              dispatch(cityRedux.actions.deleteCity(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(cityRedux.actions.setEditCity(values))
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
          data={data.map((datum: ICity) => {
            return {
              _id: datum._id,
              nama_kota: datum.nama_kota,
              nama_provinsi: datum.nama_provinsi,
            }
          })}
          keyField='_id'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {CityWidget}
