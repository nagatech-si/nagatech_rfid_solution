/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {ICity} from '../model/CityModel'
import {useDispatch, useSelector} from 'react-redux'
import * as privinceRedux from '../redux/CityRedux'
import {RootState} from '../../../../../setup'
import Select, {ActionMeta, SingleValue} from 'react-select'
import {IProvince} from '../../province/model/ProvinceModel'
import {useIntl} from 'react-intl'

const citySchema = Yup.object().shape({
  nama_kota: Yup.string().required('Required City Name').default('-'),
})

const CityModal: FC = () => {
  const dispatch = useDispatch()
  const [selectedCountry, setselectedCountry] = useState<any>(null)
  const prevData: ICity | null = useSelector<RootState>(({city}) => city.payload) as ICity | null
  const provinceData: IProvince[] | null = useSelector<RootState>(({province}) => province.data) as
    | IProvince[]
    | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const formik = useFormik<ICity>({
    enableReinitialize: true,
    initialValues: {
      _id: createMode ? '' : prevData?._id ?? '-',
      id_provinsi: createMode ? '' : prevData?.id_provinsi ?? '-',
      nama_provinsi: createMode ? '' : prevData?.nama_provinsi ?? '-',
      nama_kota: createMode ? '' : prevData?.nama_kota ?? '-',
    },
    validationSchema: citySchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(privinceRedux.actions.postCity(values))
        } else {
          dispatch(privinceRedux.actions.editCity(values))
        }
        setLoading(false)
        setselectedCountry(null)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_city' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit City' : 'Add City'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              {createMode ? (
                <div className='row mb-6'>
                  <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                    {intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'PROVINCE'})}
                    )}
                  </label>

                  <div className='col-lg-7 fv-row'>
                    <Select
                      name='nama_provinsi'
                      options={provinceData?.map((country: IProvince) => {
                        return {
                          value: `${country._id}|${country.nama_provinsi}`,
                          label: country.nama_provinsi,
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
                        formik.setFieldValue('nama_provinsi', newValue?.value.split('|')[1] ?? '-')
                        formik.setFieldValue('id_provinsi', newValue?.value.split('|')[0] ?? '-')
                      }}
                    />
                    {formik.touched.nama_provinsi && formik.errors.nama_provinsi && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.nama_provinsi}</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'CITY'})})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'nama_kota'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'CITY'})}
                    )}
                    {...formik.getFieldProps('nama_kota')}
                  />
                  {formik.touched.nama_kota && formik.errors.nama_kota && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nama_kota}</div>
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

export {CityModal}
