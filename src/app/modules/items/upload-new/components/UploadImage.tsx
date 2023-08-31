/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {ErrorMessage, FormikProps} from 'formik'
import {Gambar, IRequestUploadItem} from '../model/UploadNewHelper'
import generateAlphanumeric from '../../../../../_metronic/helpers/Generator'
import {uploadImage} from '../../../../../setup'
import {useIntl} from 'react-intl'

type Props = {
  formik: FormikProps<IRequestUploadItem>
}

const UploadImageWidget: FC<Props> = ({formik}) => {
  let listData: string[] = []
  let [imageList, setImageList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const intl = useIntl()
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'> {intl.formatMessage({id: 'UPLOAD.2'})}</h2>

        <div className='text-gray-400 fw-bold fs-6'> {intl.formatMessage({id: 'UPLOAD.2-1'})}</div>
      </div>
      <div className='d-none'>{imageList}</div>

      <div className='flex d-flex'>
        {formik.values.gambar?.map((value: Gambar, index: number) => {
          return (
            <div className='col-lg-3' key={`gambar-upload-new-divv-${index}`}>
              <img
                src={value.lokasi_gambar}
                className='w-100'
                key={`gambar-upload-new-${index}`}
                alt={`gambar-upload-new-${index}`}
              />
            </div>
          )
        })}
      </div>

      {loading ? (
        <div className='text-center'>
          <div>Hold on ...</div>
          <div>
            Upload on progress
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className='fv-row mb-10'>
        <label className='form-label required'>{intl.formatMessage({id: 'UPLOAD.IMAGE'})}</label>
        <input
          type='file'
          className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
          placeholder='Slider Image'
          name='gambar'
          multiple
          onChange={async (e) => {
            if (
              e.currentTarget.files !== undefined &&
              e.currentTarget.files !== null &&
              e.currentTarget.files.length > 0
            ) {
              let image = e.currentTarget.files
              setLoading(true)
              for (let index = 0; index < image.length; index++) {
                const reader = new FileReader()
                reader.readAsDataURL(image[index]) // assuming "image" is your file
                let imageURL = await uploadImage(
                  image[index],
                  `/gambar/${formik.values.code_item}_${index}.png`
                )
                if (listData.length > 0) {
                  let prevData = [...listData, imageURL]
                  listData.push(imageURL)
                  setImageList(prevData)
                  formik.setFieldValue(
                    'gambar',
                    listData.map((value) => {
                      return {
                        gambar_id: generateAlphanumeric(5),
                        kode_gambar: generateAlphanumeric(5),
                        lokasi_gambar: value,
                      }
                    })
                  )
                } else {
                  setImageList([imageURL])
                  listData.push(imageURL)
                }
              }
              setLoading(false)
            }
          }}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='gambar' />
        </div>
      </div>
    </div>
  )
}

export {UploadImageWidget}
