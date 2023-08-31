/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IArea} from '../model/AreaModel'
import {useDispatch, useSelector} from 'react-redux'
import * as privinceRedux from '../redux/AreaRedux'
import {RootState} from '../../../../../setup'
import Select, {ActionMeta, SingleValue} from 'react-select'
import {ICity} from '../../city/model/CityModel'
import {useIntl} from 'react-intl'

const areaSchema = Yup.object().shape({
  nama_area: Yup.string().required('Required Area Name').default('-'),
})

const AreaModal: FC = () => {
  const dispatch = useDispatch()
  const [selectedCountry, setselectedCountry] = useState<any>(null)
  const prevData: IArea | null = useSelector<RootState>(({area}) => area.payload) as IArea | null
  const cityData: ICity[] | null = useSelector<RootState>(({city}) => city.data) as ICity[] | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const formik = useFormik<IArea>({
    enableReinitialize: true,
    initialValues: {
      _id: createMode ? '' : prevData?._id ?? '-',
      id_kota: createMode ? '' : prevData?.id_kota ?? '-',
      nama_kota: createMode ? '' : prevData?.nama_kota ?? '-',
      nama_area: createMode ? '' : prevData?.nama_area ?? '-',
    },
    validationSchema: areaSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(privinceRedux.actions.postArea(values))
        } else {
          dispatch(privinceRedux.actions.editArea(values))
        }
        setLoading(false)
        setselectedCountry(null)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_area' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit Area' : 'Add Area'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              {createMode ? (
                <div className='row mb-6'>
                  <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                    {intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'CITY'})}
                    )}
                  </label>

                  <div className='col-lg-7 fv-row'>
                    <Select
                      name='nama_kota'
                      options={cityData?.map((country: ICity) => {
                        return {
                          value: `${country._id}|${country.nama_kota}`,
                          label: country.nama_kota,
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
                        formik.setFieldValue('nama_kota', newValue?.value.split('|')[1] ?? '-')
                        formik.setFieldValue('id_kota', newValue?.value.split('|')[0] ?? '-')
                      }}
                    />
                    {formik.touched.nama_kota && formik.errors.nama_kota && (
                      <div className='fv-plugins-message-container'>
                        <div className='text-danger'>{formik.errors.nama_kota}</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'AREA'})})}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'nama_area'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'AREA'})}
                    )}
                    {...formik.getFieldProps('nama_area')}
                  />
                  {formik.touched.nama_area && formik.errors.nama_area && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nama_area}</div>
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

export {AreaModal}
