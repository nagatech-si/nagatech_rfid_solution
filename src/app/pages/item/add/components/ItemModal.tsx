/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {FormikProps} from 'formik'
import {IItem} from '../model/ItemModel'
import {useSelector} from 'react-redux'

import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {BasicInputFormik, BasicSelectFormik} from '../../../../modules/Formik/Component/basicInput'

import {IGroup} from '../../../master/group/model/GroupModel'
import {IType} from '../../../master/type/model/TypeModel'
import {ITray} from '../../../master/tray/model/TrayModel'
import Webcam from 'react-webcam'
import {toBase64} from '../../../../../_metronic/helpers/imageHelper'

type Props = {
  formik: FormikProps<IItem>
}

const ItemModal: FC<Props> = ({formik}) => {
  const groupDatas: IGroup[] = useSelector<RootState>(({group}) => group.data) as IGroup[]
  const typeDatas: IType[] = useSelector<RootState>(({type}) => type.data) as IType[]
  const trayDatas: ITray[] = useSelector<RootState>(({tray}) => tray.data) as ITray[]
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [takeImage, setTakeImage] = useState(true)
  const intl = useIntl()

  const videoConstraints = {
    aspectRatio: 1,
  }

  const [deviceId, setDeviceId] = React.useState({})
  const [devices, setDevices] = React.useState([])
  const [imageTaken, setImageTaken] = useState<string | null>(null)

  const handleDevices = React.useCallback(
    (mediaDevices) => setDevices(mediaDevices.filter(({kind}) => kind === 'videoinput')),
    [setDevices]
  )

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices, deviceId])

  return (
    <div className='modal fade' id='kt_modal_item' aria-hidden='true'>
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
          <div className='modal-body  mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-5'>
              <h1 className='mb-3'>
                {!createMode
                  ? intl.formatMessage(
                      {id: 'PREFIX.EDIT'},
                      {name: intl.formatMessage({id: 'ITEM'})}
                    )
                  : intl.formatMessage(
                      {id: 'PREFIX.ADD'},
                      {name: intl.formatMessage({id: 'ITEM'})}
                    )}
              </h1>

              <div className='text-muted fw-bold fs-5'>
                Please fill all field below and then click save
              </div>
            </div>
            <div className='row justify-content-center mb-3'>
              {takeImage ? (
                <div className='col-lg-4 text-center'>
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      setTakeImage(false)
                    }}
                  >
                    Pilih Gambar
                  </button>
                </div>
              ) : (
                <div
                  className='col-lg-4 text-center'
                  onClick={() => {
                    setTakeImage(true)
                  }}
                >
                  <button className='btn btn-warning'>Ambil Gambar</button>
                </div>
              )}
            </div>
            {takeImage === true ? (
              <div>
                {imageTaken != null ? (
                  <div>
                    <div className='row justify-content-center mb-5'>
                      <img
                        className='col-lg-8 mb-3'
                        alt='imageTaken'
                        src={imageTaken}
                        width={400}
                        height={380}
                      />
                      <div className='row justify-content-center'>
                        <button
                          className='btn btn-warning'
                          onClick={() => {
                            setImageTaken(null)
                          }}
                        >
                          Ambil Ulang
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='row justify-content-center mb-5'>
                      <Webcam
                        className='col-lg-8'
                        audio={false}
                        height={400}
                        screenshotFormat='image/jpeg'
                        width={400}
                        videoConstraints={{...videoConstraints, deviceId: deviceId}}
                      >
                        {({getScreenshot}) => (
                          <div className='row justify-content-center'>
                            <button
                              className='btn btn-primary'
                              onClick={() => {
                                const imageSrc = getScreenshot()
                                formik.setFieldValue('gambar_barang', imageSrc)
                                setImageTaken(imageSrc)
                              }}
                            >
                              Capture photo
                            </button>
                          </div>
                        )}
                      </Webcam>
                    </div>
                    <BasicSelectFormik
                      label={'Select Other Webcam'}
                      name='images'
                      options={devices.map((device: any) => {
                        return {
                          value: device.deviceId,
                          label: device.label,
                        }
                      })}
                      disabled={!createMode}
                      handleChange={(value: any) => {
                        console.log(value)

                        if (value.value !== undefined) {
                          setDeviceId(value.value)
                          console.log(deviceId)
                        }
                      }}
                      defaultValue={formik.values.kode_group}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className='col-lg-12 fv-row mb-5'>
                  {imageTaken ? (
                    <div>
                      <div className='row justify-content-center mb-5'>
                        <img
                          className='col-lg-8 mb-3'
                          alt='imageTaken'
                          src={imageTaken}
                          width={400}
                          height={380}
                        />
                        <div className='row justify-content-center'>
                          <button
                            className='btn btn-warning'
                            onClick={() => {
                              setImageTaken(null)
                            }}
                          >
                            Ambil Ulang
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <input
                    type='file'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Company Picture'
                    onChange={async (e) => {
                      if (
                        e.currentTarget.files !== undefined &&
                        e.currentTarget.files !== null &&
                        e.currentTarget.files.length > 0
                      ) {
                        let image = e.currentTarget.files[0]
                        formik.setFieldValue('gambar_barang', await toBase64(image))
                        setImageTaken((await toBase64(image)) as string)
                      }
                    }}
                  />
                  {formik.touched.gambar_barang && formik.errors.gambar_barang && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.gambar_barang}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
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
              disabled={true}
              defaultValue={formik.values.kode_group}
            />
            <BasicSelectFormik
              label={intl.formatMessage(
                {id: 'BASE.CODE'},
                {name: intl.formatMessage({id: 'TYPE'})}
              )}
              name='kode_jenis'
              options={typeDatas.map((data) => {
                return {
                  value: data.kode_jenis,
                  label: data.kode_jenis,
                }
              })}
              disabled={true}
              defaultValue={formik.values.kode_jenis}
            />
            <BasicSelectFormik
              label={intl.formatMessage(
                {id: 'BASE.CODE'},
                {name: intl.formatMessage({id: 'TRAY'})}
              )}
              name='kode_baki'
              options={trayDatas.map((data) => {
                return {
                  value: data.kode_baki,
                  label: data.kode_baki,
                }
              })}
              disabled={true}
              defaultValue={formik.values.kode_baki}
            />
            <BasicInputFormik
              label={intl.formatMessage(
                {id: 'BASE.NAME'},
                {name: intl.formatMessage({id: 'ITEM'})}
              )}
              name='nama_barang'
            />
            <BasicInputFormik
              label={intl.formatMessage({id: 'ORIGINAL.WEIGHT'})}
              type='number'
              name='berat_asli'
            />
            <BasicInputFormik label={intl.formatMessage({id: 'RATE'})} type='number' name='kadar' />
            <BasicInputFormik label={intl.formatMessage({id: 'PRINT.RATE'})} name='kadar_cetak' />
            <BasicInputFormik
              label={intl.formatMessage({id: 'INTERNAL.CODE'})}
              name='kode_intern'
            />

            <button
              disabled={formik.isSubmitting}
              type='submit'
              className='btn btn-light-primary fw-bolder w-100 mb-8'
            >
              {!formik.isSubmitting && intl.formatMessage({id: 'SAVE.DATA'})}
              {formik.isSubmitting && (
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
  )
}

export {ItemModal}
