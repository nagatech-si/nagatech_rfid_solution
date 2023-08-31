/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import * as platingMethodRedux from '../redux/PlatingMethodRedux'
import {RootState} from '../../../../../setup'
import {IPlatingMethod} from '../model/PlatingMethodModel'
import {useIntl} from 'react-intl'

const platingMethodSchema = Yup.object().shape({
  stone_code: Yup.string().required('Required Item Code').default('-'),
  plating_method_code: Yup.string().required('Required Plating Method Code'),
  plating_method_name: Yup.string().required('Required Plating Method Name'),
})

const PlatingMethodModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IPlatingMethod | null = useSelector<RootState>(
    ({platingMethod}) => platingMethod.payload
  ) as IPlatingMethod | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const intl = useIntl()
  const formik = useFormik<IPlatingMethod>({
    enableReinitialize: true,
    initialValues: {
      plating_method_code: createMode ? '' : prevData?.plating_method_code ?? '',
      plating_method_name: createMode ? '' : prevData?.plating_method_name ?? '',
    },
    validationSchema: platingMethodSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(platingMethodRedux.actions.postPlatingMethod(values))
        } else {
          dispatch(platingMethodRedux.actions.editPlatingMethod(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  return (
    <div className='modal fade' id='kt_modal_plating_method' aria-hidden='true'>
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
                <h1 className='mb-3'>
                  {!createMode ? 'Edit Plating Method' : 'Add Plating Method'}
                </h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'PLATING.METHOD'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'plating_method_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'PLATING.METHOD'})}
                    )}
                    {...formik.getFieldProps('plating_method_code')}
                  />
                  {formik.touched.plating_method_code && formik.errors.plating_method_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.plating_method_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'PLATING.METHOD'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'plating_method_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'PLATING.METHOD'})}
                    )}
                    {...formik.getFieldProps('plating_method_name')}
                  />
                  {formik.touched.plating_method_name && formik.errors.plating_method_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.plating_method_name}</div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>Item Code</label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'stone_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Item Code'
                    {...formik.getFieldProps('stone_code')}
                  />
                  {formik.touched.stone_code && formik.errors.stone_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.stone_code}</div>
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

export {PlatingMethodModal}
