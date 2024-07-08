import {initializeApp} from 'firebase/app'
import {
  getDownloadURL,
  getStorage,
  ref,
  updateMetadata,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyB1JES7FtWNBoz9obp-5Z6HifP5XCsUsOI',
  authDomain: 'gambar-78b2b.firebaseapp.com',
  projectId: 'gambar-78b2b',
  storageBucket: 'gambar-78b2b.appspot.com',
  messagingSenderId: '694976070405',
  appId: '1:694976070405:web:eef580e9823e39e64dad6c',
  measurementId: 'G-YX2KKT4KRH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

export const uploadImage = async (file: Blob | ArrayBuffer, fileName: string) => {
  try {
    // Upload image.
    const imageRef = ref(storage, `RFID-SOLUTION/${fileName}`)
    const uploadImage = await uploadBytes(imageRef, file)

    // Create file metadata.
    const newMetadata = {
      cacheControl: 'public,max-age=2629800000', // 1 month
      contentType: uploadImage.metadata.contentType,
    }

    await updateMetadata(imageRef, newMetadata)

    // Get the image URL.
    const publicImageUrl = await getDownloadURL(imageRef)
    return publicImageUrl
  } catch (error) {
    throw new Error('Error Uploading Image')
  }
}

export const deleteImage = async (fileName: string) => {
  try {
    // Upload image.
    const imageRef = ref(storage, `RFID-SOLUTION/${fileName}`)
    await deleteObject(imageRef)
    return true
  } catch (error) {
    return false
  }
}
