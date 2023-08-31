/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as customerActiveRedux from './redux/CustomerActiveRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownActionCustomer} from '../../../../_metronic/layout/components/ActionDropdownCustomer'
import {RootState} from '../../../../setup'
import {ICustomer} from './model/CustomerActiveModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const CustomerActiveWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ICustomer[] = useSelector<RootState>(
    ({customerActive}) => customerActive.data
  ) as ICustomer[]
  useEffect(() => {
    dispatch(toolbarRedux.actions.SetModalToolbarName('EMPTY'))
    dispatch(customerActiveRedux.actions.fetchAllCustomer())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_customer',
      text: intl.formatMessage({id: 'CUSTOMER.NAME'}),
      sort: true,
    },
    {
      dataField: 'username',
      text: intl.formatMessage({id: 'USERNAME'}),
      sort: true,
    },
    {
      dataField: 'negara',
      text: intl.formatMessage({id: 'COUNTRY'}),
      sort: true,
    },
    {
      dataField: 'alamat',
      text: intl.formatMessage({id: 'ADDRESS'}),
      sort: true,
    },
    {
      dataField: 'kontak',
      text: intl.formatMessage({id: 'CONTACT'}),
      sort: true,
    },
    {
      dataField: 'isactive',
      text: intl.formatMessage({id: 'STATUS'}),
      sort: true,
      formatter: (_: any, values: ICustomer, index: number) => {
        console.log(values.isactive)

        if (values.isactive) {
          return (
            <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Active</span>
          )
        } else {
          return (
            <span className='badge badge-light-danger fw-bolder fs-8 px-2 py-3 ms-2'>
              Non Active
            </span>
          )
        }
      },
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ICustomer, index: number) => {
        return (
          <DropdownActionCustomer
            handleDelete={() => {
              dispatch(customerActiveRedux.actions.deleteCustomer(values))
            }}
            handleSuspend={() => {
              dispatch(customerActiveRedux.actions.suspendCustomer(values))
            }}
            handleUnsusped={() => {
              console.log(values)

              dispatch(customerActiveRedux.actions.unSuspendCustomer(values))
            }}
            customerActive={values.isactive}
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
          data={data.map((datum: ICustomer) => {
            return {
              _id: datum._id,
              user: datum.user,
              kode_customer: datum.kode_customer,
              nama_customer: datum.nama_customer,
              username: datum.user.length > 0 ? datum.user[0].nama_user ?? '-' : '-',
              negara: `${datum.negara}, ${datum.provinsi}, ${datum.kota}, ${datum.area}`,
              alamat: datum.alamat,
              kontak: datum.kontak,
              isactive: datum.isactive,
            }
          })}
          keyField='_id'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {CustomerActiveWidget}
