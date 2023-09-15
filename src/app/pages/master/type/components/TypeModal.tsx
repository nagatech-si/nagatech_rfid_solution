/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Form, Formik, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {IType} from '../model/TypeModel'
import {useDispatch, useSelector} from 'react-redux'
import * as typeRedux from '../redux/TypeRedux'

import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {BasicInputFormik, BasicSelectFormik} from '../../../../modules/Formik/Component/basicInput'
import {IGroup} from '../../group/model/GroupModel'
import {alfaNumerikOnly} from '../../../../../_metronic/helpers/YupCustomMiddleware'

const TypeModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IType | null = useSelector<RootState>(({type}) => type.payload) as IType | null
  const groupDatas: IGroup[] = useSelector<RootState>(({group}) => group.data) as IGroup[]
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const intl = useIntl()

  const groupTypeSchema = Yup.object().shape({
    kode_group: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    nama_jenis: Yup.string().required(intl.formatMessage({id: 'CANT.BE.EMPTY'})),
    kode_jenis: alfaNumerikOnly(intl.formatMessage({id: 'ONLY.ALFA.NUMERIC'})).required(
      intl.formatMessage({id: 'CANT.BE.EMPTY'})
    ),
  })

  const handleSubmit = (values: any, actions: FormikHelpers<IType>) => {
    setLoading(true)
    if (createMode) {
      dispatch(typeRedux.actions.postType(values))
    } else {
      dispatch(typeRedux.actions.editType(values))
    }
    setLoading(false)
    actions.resetForm()
  }
  return (
    <div className='modal fade' id='kt_modal_type' aria-hidden='true'>
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
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              _id: createMode ? '' : prevData?._id ?? '',
              kode_group: createMode ? '' : prevData?.kode_group ?? '',
              kode_jenis: createMode ? '' : prevData?.kode_jenis ?? '',
              nama_jenis: createMode ? '' : prevData?.nama_jenis ?? '',
            }}
            validationSchema={groupTypeSchema}
            enableReinitialize
          >
            {(props) => (
              <Form>
                <div className='modal-body  mx-5 mx-xl-18 pt-0 pb-15'>
                  <div className='text-center mb-13'>
                    <h1 className='mb-3'>
                      {' '}
                      {!createMode
                        ? intl.formatMessage(
                            {id: 'PREFIX.EDIT'},
                            {name: intl.formatMessage({id: 'TYPE'})}
                          )
                        : intl.formatMessage(
                            {id: 'PREFIX.ADD'},
                            {name: intl.formatMessage({id: 'TYPE'})}
                          )}
                    </h1>

                    <div className='text-muted fw-bold fs-5'>
                      Please fill all field below and then click save
                    </div>
                  </div>
                  <BasicSelectFormik
                    label={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'GROUP'})}
                    )}
                    name='kode_group'
                    options={groupDatas.map((data) => {
                      return {
                        value: data.kode_group,
                        label: data.kode_group,
                      }
                    })}
                    disabled={!createMode}
                    defaultValue={props.values.kode_group}
                  />
                  <BasicInputFormik
                    disabled={!createMode}
                    label={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'TYPE'})}
                    )}
                    name='kode_jenis'
                  />
                  <BasicInputFormik
                    label={intl.formatMessage(
                      {id: 'BASE.NAME'},
                      {name: intl.formatMessage({id: 'TYPE'})}
                    )}
                    name='nama_jenis'
                  />

                  <button
                    type='submit'
                    className='btn btn-light-primary fw-bolder w-100 mb-8'
                    disabled={loading}
                  >
                    {!loading && intl.formatMessage({id: 'SAVE.DATA'})}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export {TypeModal}
