/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import * as stoneTypeRedux from '../redux/NickelContentRedux'
import {RootState} from '../../../../../setup'
import {INickelContent} from '../model/NickelContentModel'
import {useIntl} from 'react-intl'

const stoneTypeSchema = Yup.object().shape({
  colour_type_code: Yup.string().required('Required Item Code').default('-'),
  nickel_content_code: Yup.string().required('Required Nickel Content Code'),
  nickel_content_name: Yup.string().required('Required Nickel Content Name'),
})

const NickelContentModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: INickelContent | null = useSelector<RootState>(
    ({nickelContent}) => nickelContent.payload
  ) as INickelContent | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const intl = useIntl()
  const formik = useFormik<INickelContent>({
    enableReinitialize: true,
    initialValues: {
      colour_type_code: createMode ? '' : prevData?.colour_type_code ?? '-',
      nickel_content_code: createMode ? '' : prevData?.nickel_content_code ?? '',
      nickel_content_name: createMode ? '' : prevData?.nickel_content_name ?? '',
    },
    validationSchema: stoneTypeSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(stoneTypeRedux.actions.postNickelContent(values))
        } else {
          dispatch(stoneTypeRedux.actions.editNickelContent(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  return (
    <div className='modal fade' id='kt_modal_nickel_content' aria-hidden='true'>
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
                  {!createMode ? 'Edit Nickel Content' : 'Add Nickel Content'}
                </h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'METAL.NICKEL_CONTENT'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'nickel_content_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'METAL.NICKEL_CONTENT'})}
                    )}
                    {...formik.getFieldProps('nickel_content_code')}
                  />
                  {formik.touched.nickel_content_code && formik.errors.nickel_content_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nickel_content_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'METAL.NICKEL_CONTENT'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'nickel_content_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'METAL.NICKEL_CONTENT'})}
                    )}
                    {...formik.getFieldProps('nickel_content_name')}
                  />
                  {formik.touched.nickel_content_name && formik.errors.nickel_content_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.nickel_content_name}</div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>Item Code</label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'colour_type_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Item Code'
                    {...formik.getFieldProps('colour_type_code')}
                  />
                  {formik.touched.colour_type_code && formik.errors.colour_type_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.colour_type_code}</div>
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

export {NickelContentModal}
