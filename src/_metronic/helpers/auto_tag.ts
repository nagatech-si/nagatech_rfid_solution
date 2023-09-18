import {Socket} from 'socket.io-client'
import {getLocalUser} from './localHelpers'
import {Toast} from './Sweetalert'
import {Dispatch} from 'redux'
import * as itemRedux from '../../app/pages/item/add/redux/ItemRedux'
import {fetchAllItemFiltered} from '../../app/pages/item/add/redux/ItemCRUD'

export async function prosesTagId(
  kodebarcode: string,
  socket: Socket,
  dispatch: Dispatch,
  kode_baki: string
) {
  if (kodebarcode === '-') {
    throw Error('Invalid kodebarcode')
  }
  ;(document.getElementById('nota_ganerate') as HTMLTextAreaElement).value =
    kodebarcode + ',' + getLocalUser().user_id
  TextFile('auto_gettag')

  socket.on(`edit-tag`, (msg) => {
    if (msg.error === true) {
      Toast.fire({
        icon: 'info',
        title: 'Information',
        text: 'Tag Already Registered ,And Item Successfully Added',
      })
      return false
    } else {
      if (msg.user_id === getLocalUser().user_id) {
        Toast.fire({
          icon: 'info',
          title: 'Information',
          text: 'Tag Successfully Registered ,And Item Successfully Added',
        }).then(async (response) => {
          if (response.isDismissed || response.isConfirmed) {
            const res = await fetchAllItemFiltered({
              berat_dari: 0,
              berat_sampai: 0,
              kode_baki,
              kode_barcode: 'ALL',
              kode_group: 'ALL',
              kode_jenis: 'ALL',
              nama_barang: 'ALL',
              tag_id: 'ALL',
            })
            dispatch(itemRedux.actions.saveItem(res.data))
          }
        })
        return false
      }
    }
  })
}

export const TextFile = (nama_file: string): void => {
  const element = document.createElement('a')
  const textAreaValue = (document.getElementById('nota_ganerate') as HTMLTextAreaElement).value

  const file = new Blob([textAreaValue], {
    type: 'text/plain;charset=utf-8',
  })

  element.href = URL.createObjectURL(file)
  element.download = nama_file + '.txt'
  document.body.appendChild(element)
  element.click()
}
