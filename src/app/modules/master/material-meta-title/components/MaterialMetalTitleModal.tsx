/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IMaterialMetalTitle} from '../model/MaterialMetalTitleModel'
import {useDispatch, useSelector} from 'react-redux'
import * as materialMetalTitleRedux from '../redux/MaterialMetalTitleRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

const materialMetalTitleSchema = Yup.object().shape({
  quote_data_price_code: Yup.string().required('Required Quote Data Price').default('-'),
  metal_title_code: Yup.string().required('Required Material Type Code'),
  metal_title_name: Yup.string().required('Required Sample Type Name'),
})

const MaterialMetalTitleModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IMaterialMetalTitle | null = useSelector<RootState>(
    ({materialMetalTitle}) => materialMetalTitle.payload
  ) as IMaterialMetalTitle | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const intl = useIntl()
  const formik = useFormik<IMaterialMetalTitle>({
    enableReinitialize: true,
    initialValues: {
      quote_data_price_code: createMode ? '' : prevData?.quote_data_price_code ?? '-',
      metal_title_code: createMode ? '' : prevData?.metal_title_code ?? '',
      metal_title_name: createMode ? '' : prevData?.metal_title_name ?? '',
    },
    validationSchema: materialMetalTitleSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(materialMetalTitleRedux.actions.postMaterialMetalTitle(values))
        } else {
          dispatch(materialMetalTitleRedux.actions.editMaterialMetalTitle(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  return (
    <div className='modal fade' id='kt_modal_metal_title' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit Material Type' : 'Add Material Type'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'METAL.TITLE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'metal_title_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'METAL.TITLE'})}
                    )}
                    {...formik.getFieldProps('metal_title_code')}
                  />
                  {formik.touched.metal_title_code && formik.errors.metal_title_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.metal_title_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'METAL.TITLE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'metal_title_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'METAL.TITLE'})}
                    )}
                    {...formik.getFieldProps('metal_title_name')}
                  />
                  {formik.touched.metal_title_name && formik.errors.metal_title_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.metal_title_name}</div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>Item Code</label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'quote_data_price_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Item Code'
                    {...formik.getFieldProps('quote_data_price_code')}
                  />
                  {formik.touched.quote_data_price_code && formik.errors.quote_data_price_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.quote_data_price_code}</div>
                    </div>
                  )}
                </div>
              </div> */}

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

export {MaterialMetalTitleModal}
