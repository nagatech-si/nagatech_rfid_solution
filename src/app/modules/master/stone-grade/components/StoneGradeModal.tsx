/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import * as stoneTypeRedux from '../redux/StoneGradeRedux'
import {RootState} from '../../../../../setup'
import {IStoneGrade} from '../model/StoneGradeModel'
import {useIntl} from 'react-intl'

const stoneTypeSchema = Yup.object().shape({
  stone_code: Yup.string().required('Required Item Code').default('-'),
  stone_grade_code: Yup.string().required('Required Stone Grade Code'),
  stone_grade_name: Yup.string().required('Required Stone Grade Name'),
})

const StoneGradeModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IStoneGrade | null = useSelector<RootState>(
    ({stoneGrade}) => stoneGrade.payload
  ) as IStoneGrade | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const intl = useIntl()
  const formik = useFormik<IStoneGrade>({
    enableReinitialize: true,
    initialValues: {
      stone_code: createMode ? '' : prevData?.stone_code ?? '-',
      stone_grade_code: createMode ? '' : prevData?.stone_grade_code ?? '',
      stone_grade_name: createMode ? '' : prevData?.stone_grade_name ?? '',
    },
    validationSchema: stoneTypeSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(stoneTypeRedux.actions.postStoneGrade(values))
        } else {
          dispatch(stoneTypeRedux.actions.editStoneGrade(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  return (
    <div className='modal fade' id='kt_modal_stone_grade' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit Stone Grade' : 'Add Stone Grade'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'STONE.GRADE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'stone_grade_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'STONE.GRADE'})}
                    )}
                    {...formik.getFieldProps('stone_grade_code')}
                  />
                  {formik.touched.stone_grade_code && formik.errors.stone_grade_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.stone_grade_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'STONE.GRADE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'stone_grade_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'STONE.GRADE'})}
                    )}
                    {...formik.getFieldProps('stone_grade_name')}
                  />
                  {formik.touched.stone_grade_name && formik.errors.stone_grade_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.stone_grade_name}</div>
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

export {StoneGradeModal}
