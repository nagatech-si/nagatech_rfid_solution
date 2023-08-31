/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'

import {useLocation} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {IProfile} from './model/ProfileModel'
import * as profileRedux from './redux/ProfileRedux'

const AccountHeader: React.FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const profileDatas = useSelector<RootState>(({profile}) => profile.data) as IProfile[]
  let profileData = profileDatas.length > 0 ? profileDatas[0] : null

  useEffect(() => {
    dispatch(profileRedux.actions.fetchAllProfile())
  }, [dispatch])
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol  symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={profileData?.logo} alt='Logo Perusahaan' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {profileData?.nama_perusahaan}
                  </a>

                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    ({profileData?.kode_perusahaan})
                  </a>
                  <a href='#'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/general/gen018.svg'
                      className='svg-icon-4 me-1'
                    />
                    {profileData?.alamat}
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {profileData?.email}
                  </a>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/communication/com005.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-4 fw-bolder'>{profileData?.no_hp}</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Phone</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/general/gen018.svg'
                        className='svg-icon-3 svg-icon-danger me-2'
                      />
                      <div className='fs-4 fw-bolder'>{profileData?.lokasi}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Location</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/account/overview' && 'active')
                }
                to='/crafted/account/overview'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/account/settings' && 'active')
                }
                to='/crafted/account/settings'
              >
                Settings
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/account/change-password' && 'active')
                }
                to='/crafted/account/change-password'
              >
                Change Password
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {AccountHeader}
