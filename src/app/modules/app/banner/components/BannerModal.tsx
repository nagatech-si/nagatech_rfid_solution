/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {ErrorMessage, Field, Formik} from 'formik'
import * as Yup from 'yup'
import {IBanner, IDetailCode, IDetailHashtag, IHashtag} from '../model/BannerModal'
import {useDispatch, useSelector} from 'react-redux'
import * as sampleTypeRedux from '../redux/BannerRedux'
import {RootState, uploadImage} from '../../../../../setup'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'
import Select, {ActionMeta, SingleValue} from 'react-select'
import {IItem} from '../../../items/master-line/model/MasterLineModel'
import {MyOption} from '../../../../../_metronic/helpers/FormikReactSelect'

import Swal from 'sweetalert2'
import {useIntl} from 'react-intl'

const bannerSchema = Yup.object().shape({
  lokasi_gambar: Yup.string().required('Required Image'),
  deskripsi: Yup.string().required('Required Description'),
})

const BannerModal: FC = () => {
  const dispatch = useDispatch()
  const [Banner, setBanner] = useState<string>('-')
  const [loading, setLoading] = useState(false)
  const [SelectedFile, setSelectedFile] = useState<File | null>(null)
  const createMode = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const itemDatas: IItem[] = useSelector<RootState>(({item}) => item.data) as IItem[]
  const hashtags: IHashtag[] = useSelector<RootState>(({banner}) => banner.hashtag) as IHashtag[]
  const prevData: IBanner = useSelector<RootState>(({banner}) => banner.payload) as IBanner

  const itemOptions: MyOption[] = itemDatas
    .filter((value) => value.status_show === 'VALID')
    .map((value) => {
      return {
        value: value.code_item,
        label: value.item_name,
      }
    })
  const hashtagOptions: MyOption[] = hashtags.map((value: IHashtag) => {
    return {
      value: value.hashtag,
      label: value.hashtag,
    }
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_banner' aria-hidden='true'>
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
            enableReinitialize={true}
            validationSchema={bannerSchema}
            initialValues={{
              _id: '',
              category: createMode ? 'HASHTAG' : prevData?.category,
              deskripsi: createMode ? '' : prevData?.deskripsi,
              detail_code: createMode
                ? [
                    {
                      code_item: '-',
                    },
                  ]
                : prevData?.detail_code,
              detail_hashtag: createMode
                ? [
                    {
                      hashtag: '-',
                    },
                  ]
                : prevData?.detail_hashtag,
              kode_banner: createMode ? '' : prevData?.kode_banner,
              kode_gambar: createMode ? '' : prevData?.kode_gambar,
              lokasi_gambar: createMode ? '' : prevData?.lokasi_gambar,
              code_item: createMode ? [] : prevData?.code_item,
              hashtag: createMode ? [] : prevData?.hashtag,
            }}
            onSubmit={async (values, formik) => {
              if (values.lokasi_gambar === '') {
                if (SelectedFile === null) {
                  formik.setFieldError('lokasi_gambar', 'Please Select Image')
                  return
                }
              }
              setLoading(true)
              var namaGambar = generateAlphanumeric(5)
              if (SelectedFile) {
                var publicURL = await uploadImage(SelectedFile!, `banner/${namaGambar}.png`)
                values.lokasi_gambar = publicURL
                if (createMode) {
                  values.kode_banner = generateAlphanumeric(5)
                }
                values.kode_gambar = namaGambar
              } else {
                values.lokasi_gambar = prevData?.lokasi_gambar
              }

              if (values.detail_hashtag?.length || 0 < 1) {
                values.detail_hashtag = [
                  {
                    hashtag: '-',
                  },
                ]
              }
              if (values.detail_code?.length || 0 < 1) {
                values.detail_code = [
                  {
                    code_item: '-',
                  },
                ]
              }
              let prevDataCode: IDetailCode[] = []
              let prevDataHashtag: IDetailHashtag[] = []
              values.code_item?.forEach((value) => {
                var index = itemOptions.findIndex((item) => item.value === value)
                if (index !== -1) {
                  prevDataCode.push({
                    code_item: itemOptions[index].value,
                  })
                  values.detail_code = prevDataCode
                }
              })
              values.hashtag?.forEach((value) => {
                var index = hashtagOptions.findIndex((item) => item.value === value)
                if (index !== -1) {
                  prevDataHashtag.push({
                    hashtag: hashtagOptions[index].value,
                  })
                  values.detail_hashtag = prevDataHashtag
                }
              })
              if (createMode) {
                dispatch(sampleTypeRedux.actions.postBanner(values))
              } else {
                dispatch(sampleTypeRedux.actions.editBanner(values))
              }
              setLoading(false)
              setBanner('-')
              formik.resetForm()
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} noValidate className='form'>
                <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
                  <div className='text-center mb-13'>
                    <h1 className='mb-3'>{'Add Banner'}</h1>

                    <div className='text-muted fw-bold fs-5'>
                      Please fill all field below and then click save
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                      {intl.formatMessage({id: 'BANNER.TITLE'})}
                    </label>
                    <div className='col-lg-7 fv-row'>
                      <Field
                        name='deskripsi'
                        type='text'
                        key={'deskripsi'}
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Banner Title'
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name={`deskripsi`} />
                      </div>
                    </div>
                  </div>
                  <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                    {intl.formatMessage({id: 'TYPE.BANNER'})}
                  </label>

                  <div className='mb-5'>
                    <div className='form-check form-check-custom form-check-solid mb-2'>
                      <Field
                        className='form-check-input'
                        type='radio'
                        name='category'
                        value='ITEM'
                      />
                      <label className='form-check-label'>Item</label>
                    </div>
                    <div className='form-check form-check-custom form-check-solid'>
                      <Field
                        className='form-check-input'
                        type='radio'
                        name='category'
                        value='HASHTAG'
                      />
                      <label className='form-check-label'>Hashtag</label>
                    </div>
                    <div className='text-danger mt-2'>
                      <ErrorMessage name={`category`} />
                    </div>
                  </div>
                  <div className='row text-center'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                      <div className='card card-custom overlay overflow-hidden '>
                        <div className='card-body p-0'>
                          {formik.values.lokasi_gambar ? (
                            <div className='overlay-wrapper'>
                              <img
                                src={formik.values.lokasi_gambar!}
                                alt=''
                                className='w-100 rounded'
                              />
                            </div>
                          ) : Banner !== '-' ? (
                            <div className='overlay-wrapper'>
                              <img src={Banner!} alt='' className='w-100 rounded' />
                            </div>
                          ) : null}
                          <div className='overlay-layer bg-dark bg-opacity-10'>
                            <button
                              type='button'
                              onClick={() => {
                                if (formik.values.lokasi_gambar) {
                                  formik.setFieldValue('lokasi_gambar', formik)
                                } else {
                                  setBanner('-')
                                }
                              }}
                              className='btn btn-light-danger btn-shadow ms-2'
                            >
                              <span className='svg-icon svg-icon-1'>
                                <KTSVG
                                  path='/media/icons/duotune/files/fil007.svg'
                                  className='svg-icon-muted svg-icon-1'
                                />
                              </span>
                              {!loading && 'Delete'}
                              {loading && (
                                <span className='indicator-progress' style={{display: 'block'}}>
                                  Please wait...{' '}
                                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-4'></div>
                  </div>
                  <div className='col-lg-12 fv-row mt-4 mb-4'>
                    <input
                      type='file'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Banner Image'
                      name='lokasi_gambar'
                      onBlur={formik.handleBlur}
                      onChange={async (e) => {
                        if (
                          e.currentTarget.files !== undefined &&
                          e.currentTarget.files !== null &&
                          e.currentTarget.files.length > 0
                        ) {
                          let image = e.currentTarget.files[0]
                          const reader = new FileReader()
                          reader.readAsDataURL(image)

                          reader.onload = () => {
                            formik.setFieldValue('lokasi_gambar', reader.result)
                            setBanner(reader.result?.toString() ?? '-')
                          }
                          setSelectedFile(image)
                        }
                      }}
                    />
                    <div className='text-danger mt-2'>
                      <ErrorMessage name={`lokasi_gambar`} />
                    </div>
                  </div>

                  <div className='row mb-6'>
                    <label className='col-lg-5 col-form-label fw-bold fs-6'>
                      {intl.formatMessage({id: 'SELECT.ITEM'})}
                    </label>

                    <div className='col-lg-7 fv-row'>
                      <Select
                        isDisabled={formik.values.category === 'HASHTAG'}
                        name='detail_code'
                        options={itemOptions}
                        className='basic-select fw-bold'
                        classNamePrefix='form-select'
                        closeMenuOnSelect
                        onChange={function (
                          newValue: SingleValue<any>,
                          actionMeta: ActionMeta<any>
                        ): void {
                          let prevData = formik.values?.detail_code || []
                          let prevCode = formik.values?.code_item || []
                          prevCode.forEach((value: any) => {
                            if (value instanceof Object) {
                              prevCode = []
                            }
                          })
                          if (prevCode.includes(newValue.value)) {
                            Swal.fire({
                              icon: 'warning',
                              title: 'Duplicate selected item',
                              text: 'Please select another item on the list',
                            })
                            return
                          }
                          prevData.push({code_item: newValue.value})
                          formik.setFieldValue('detail_code', prevData)
                          prevCode.push(newValue.value)
                          let purified = prevCode.filter((value: any) => {
                            if (!(value instanceof Object)) {
                              return value
                            }
                          })
                          formik.setFieldValue('code_item', purified)
                        }}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name={`detail_code`} />
                      </div>
                    </div>
                  </div>
                  {formik.values.category === 'ITEM' ? (
                    <div className='row mb-6 gy-3 gx-3'>
                      <div className='d-flex flex-wrap mt-2'>
                        {formik.values.code_item?.map((value: string, index) => {
                          return (
                            <span key={value} className='badge badge-light-primary me-5 fs-6 mt-3'>
                              Item: {value}
                              <i
                                className='bi bi-x-lg text-primary ms-3'
                                onClick={() => {
                                  formik.setFieldValue(
                                    'detail_code',
                                    formik.values.code_item?.filter((_, i) => i !== index)
                                  )
                                  formik.setFieldValue(
                                    'code_item',
                                    formik.values.code_item?.filter((_, i) => i !== index)
                                  )
                                }}
                              />
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}

                  <div className='row mb-6'>
                    <label className='col-lg-5 col-form-label fw-bold fs-6'>
                      {intl.formatMessage({id: 'SELECT.HASHTAG'})}
                    </label>

                    <div className='col-lg-7 fv-row'>
                      <Select
                        isDisabled={!(formik.values.category === 'HASHTAG')}
                        name='detail_hashtag'
                        options={hashtagOptions}
                        className='basic-select fw-bold'
                        classNamePrefix='form-select'
                        closeMenuOnSelect
                        onChange={function async(
                          newValue: SingleValue<any>,
                          actionMeta: ActionMeta<any>
                        ): void {
                          try {
                            let prevData = formik.values?.detail_hashtag || []
                            let prevCode = formik.values?.hashtag || []
                            console.log('SEBELUM', prevCode)
                            if (prevCode.includes(newValue.value)) {
                              Swal.fire({
                                icon: 'warning',
                                title: 'Duplicate selected hashtag',
                                text: 'Please select another hashtag on the list',
                              })
                              return
                            }
                            prevData.push({hashtag: newValue.value})
                            formik.setFieldValue('detail_hashtag', prevData)
                            prevCode.push(newValue.value)
                            console.log('SESUDAH', prevCode)
                            let purified = prevCode.filter((value: any) => {
                              console.log(typeof value)
                              if (!(value instanceof Object)) {
                                return value
                              }
                            })
                            formik.setFieldValue('hashtag', purified)
                          } catch (e) {
                            console.log(e)
                          }
                        }}
                      />
                      <div className='text-danger mt-2'>
                        <ErrorMessage name={`detail_hashtag`} />
                      </div>
                    </div>
                  </div>
                  {formik.values.category === 'HASHTAG' ? (
                    <div className='row mb-6 gy-3 gx-3'>
                      <div className='d-flex flex-wrap mt-2'>
                        {formik.values?.hashtag?.map((value: string, index) => {
                          return (
                            <span
                              key={'HASHTAG' + index}
                              className='badge badge-light-primary me-5 fs-6 mt-3'
                            >
                              Item: {value ?? '-'}
                              <i
                                className='bi bi-x-lg text-primary ms-3'
                                onClick={() => {
                                  let hasil = formik.values.hashtag?.filter((_, i) => i !== index)
                                  formik.setFieldValue('hashtag', hasil)
                                  formik.setFieldValue('detail_hashtag', hasil)
                                }}
                              />
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}
                  <button
                    type='submit'
                    className='btn btn-light-primary fw-bolder w-100 mb-8'
                    disabled={loading}
                  >
                    {!loading && 'Save Changes'}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export {BannerModal}
