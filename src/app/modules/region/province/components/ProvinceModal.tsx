/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IProvince} from '../model/ProvinceModel'
import {useDispatch, useSelector} from 'react-redux'
import * as privinceRedux from '../redux/ProvinceRedux'
import {RootState} from '../../../../../setup'
import {ICountry} from '../../country/model/CountryModel'
import Select, {ActionMeta, SingleValue} from 'react-select'
import {useIntl} from 'react-intl'

const provinceSchema = Yup.object().shape({
  nama_negara: Yup.string().required('Required Nama Negara').default('-'),
})

const ProvinceModal: FC = () => {
  const dispatch = useDispatch()
  const [selectedCountry, setselectedCountry] = useState<any>(null)
  const prevData: IProvince | null = useSelector<RootState>(
    ({province}) => province.payload
  ) as IProvince | null
  const countryData: ICountry[] | null = useSelector<RootState>(({country}) => country.data) as
    | ICountry[]
    | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const formik = useFormik<IProvince>({
    enableReinitialize: true,
    initialValues: {
      _id: createMode ? '' : prevData?._id ?? '-',
      id_negara: createMode ? '' : prevData?.id_negara ?? '-',
      nama_negara: createMode ? '' : prevData?.nama_negara ?? '-',
      nama_provinsi: createMode ? '' : prevData?.nama_provinsi ?? '-',
    },
    validationSchema: provinceSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(privinceRedux.actions.postProvince(values))
        } else {
          dispatch(privinceRedux.actions.editProvince(values))
        }
        setLoading(false)
        setselectedCountry(null)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_province' aria-hidden='true'>
      <div className='modal-dialog mw-750px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              id='close-modal'
              data-bs-dismiss='modal'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
              <div className='text-center mb-13'>
                <h1 className='mb-3'>{!createMode ? 'Edit Province' : 'Add Province'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              {createMode ? (
                <div className='row mb-6'>
                  <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                    {intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'COUNTRY'})}
                    )}
                  </label>

                  <div className='col-lg-7 fv-row'>
                    <Select
                      name='nama_negara'
                      options={countryData?.map((country: ICountry) => {
                        return {
                          value: `${country._id}|${country.nama_negara}`,
                          label: country.nama_negara,
                        }
                      })}
                      className='basic-select fw-bold'
                      classNamePrefix='form-select'
                      closeMenuOnSelect
                      isClearable
                      value={selectedCountry}
                      onChange={function (
                        newValue: SingleValue<any>,
                        actionMeta: ActionMeta<any>
                      ): void {
                        setselectedCountry(newValue)
                        formik.setFieldValue('nama_negara', newValue?.value.split('|')[1] ?? '-')
                        formik.setFieldValue('id_negara', newValue?.value.split('|')[0] ?? '-')
                      }}
                    />
                    {formik.touched.nama_negara && formik.errors.nama_negara && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.nama_negara}</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'PROVINCE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'nama_provinsi'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'PROVINCE'})}
                    )}
                    {...formik.getFieldProps('nama_provinsi')}
                  />
                  {formik.touched.nama_provinsi && formik.errors.nama_provinsi && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nama_provinsi}</div>
                    </div>
                  )}
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-light-primary fw-bolder w-100 mb-8'
                disabled={loading}
              >
                {!loading && 'Save Changes'}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export {ProvinceModal}
