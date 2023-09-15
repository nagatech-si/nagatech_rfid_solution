/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup'
import {Languages} from './Languages'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'
import {toAbsoluteUrl} from '../../../helpers'
import {IProfile} from '../../../../app/modules/accounts/model/ProfileModel'
import {useIntl} from 'react-intl'

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const profile: IProfile[] = useSelector<RootState>(({profile}) => profile.data) as IProfile[]

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
  }

  const intl = useIntl()

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img
              alt='Logo'
              src={profile[0]?.logo ?? '-'}
              onError={({currentTarget}) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = toAbsoluteUrl('/media/svg/unitedpalms/Image.svg')
              }}
            />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {user.nama_user} - {user.user_id.toUpperCase()}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user.user_id}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      {/* <div className='menu-item px-5'>
        <Link to={'/crafted/account/overview'} className='menu-link px-5'>
          My Profile
        </Link>
      </div> */}

      <div className='separator my-2'></div>

      <Languages />

      {/* <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div> */}

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          {intl.formatMessage({id: 'LOGOUT'})}
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
